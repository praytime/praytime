import {
  calculatePrayerTimes,
  type PrayerTimeConfig,
} from "@masaajid/prayer-times";
import { parsePrayerValue } from "./timing";
import type { MasjidRecord } from "./types";

export interface CrawlValidationResult {
  errors: string[];
  warnings: string[];
}

interface LocalDateParts {
  day: number;
  month: number;
  year: number;
}

interface ComparableBoundary {
  comparableMinutes: number;
  label: string;
}

interface ValidationSchedule {
  asrStandard: ComparableBoundary;
  dhuhr: ComparableBoundary;
  earliestAsr: ComparableBoundary;
  fajrBoundary: ComparableBoundary;
  highLatitude: boolean;
  ishaBoundary: ComparableBoundary;
  localDate: string;
  sunrise: ComparableBoundary;
  sunset: ComparableBoundary;
}

interface ValidationCandidate extends CrawlValidationResult {
  dateOffset: number;
  localDate: string;
}

type ParseablePrayerValue = Extract<
  ReturnType<typeof parsePrayerValue>,
  { kind: "time" }
>;

const DEFAULT_TOLERANCE_MINUTES = 5;
const HIGH_LATITUDE_THRESHOLD = 48;
const MAGHRIB_LATE_WARNING_MINUTES = 20;

const buildDateFormatter = (
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat =>
  new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone,
  });

const getLocalDateParts = (date: Date, timeZone: string): LocalDateParts => {
  const parts = buildDateFormatter(timeZone, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter(
        (part) =>
          part.type === "year" || part.type === "month" || part.type === "day",
      )
      .map((part) => [part.type, Number.parseInt(part.value, 10)]),
  );

  const year = values.year;
  const month = values.month;
  const day = values.day;
  if (!year || !month || !day) {
    throw new Error(`failed to resolve local date parts for ${timeZone}`);
  }

  return { year, month, day };
};

const getEpochDay = (parts: LocalDateParts): number =>
  Math.trunc(Date.UTC(parts.year, parts.month - 1, parts.day) / 86_400_000);

const formatLocalDate = (parts: LocalDateParts): string =>
  `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}`;

const addLocalDays = (parts: LocalDateParts, days: number): LocalDateParts => {
  const next = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + days),
  );
  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth() + 1,
    day: next.getUTCDate(),
  };
};

const getTimeZoneOffsetMinutes = (date: Date, timeZone: string): number => {
  const timeZoneName = buildDateFormatter(timeZone, {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  if (!timeZoneName || timeZoneName === "GMT" || timeZoneName === "UTC") {
    return 0;
  }

  const match = /^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/.exec(timeZoneName);
  if (!match) {
    throw new Error(
      `failed to parse timezone offset ${timeZoneName} for ${timeZone}`,
    );
  }

  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number.parseInt(match[2] ?? "0", 10);
  const minutes = Number.parseInt(match[3] ?? "0", 10);
  return sign * (hours * 60 + minutes);
};

const toDateAtLocalHour = (
  parts: LocalDateParts,
  timeZone: string,
  hour: number,
  minute: number,
): Date => {
  const guess = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute),
  );
  const offsetMinutes = getTimeZoneOffsetMinutes(guess, timeZone);
  return new Date(guess.getTime() - offsetMinutes * 60_000);
};

export const formatLocalClock = (date: Date, timeZone: string): string => {
  const parts = buildDateFormatter(timeZone, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;
  const period = parts.find((part) => part.type === "dayPeriod")?.value;

  if (!hour || !minute || !period) {
    throw new Error(`failed to format local clock for ${timeZone}`);
  }

  return `${hour}:${minute}${period.toLowerCase() === "am" ? "a" : "p"}`;
};

const toComparableBoundary = (
  date: Date,
  localDate: LocalDateParts,
  timeZone: string,
): ComparableBoundary => {
  const localParts = getLocalDateParts(date, timeZone);
  const diffDays = getEpochDay(localParts) - getEpochDay(localDate);
  const timeParts = buildDateFormatter(timeZone, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number.parseInt(
    timeParts.find((part) => part.type === "hour")?.value ?? "",
    10,
  );
  const minute = Number.parseInt(
    timeParts.find((part) => part.type === "minute")?.value ?? "",
    10,
  );

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    throw new Error(`failed to resolve comparable boundary for ${timeZone}`);
  }

  let label = formatLocalClock(date, timeZone);
  if (diffDays > 0) {
    label = `${label} (+${diffDays}d)`;
  } else if (diffDays < 0) {
    label = `${label} (${diffDays}d)`;
  }

  return {
    comparableMinutes: diffDays * 1_440 + hour * 60 + minute,
    label,
  };
};

const buildPrayerConfig = (
  record: MasjidRecord,
  date: Date,
  overrides: Partial<PrayerTimeConfig>,
): PrayerTimeConfig => ({
  method: "Custom",
  location: [record.geo.latitude, record.geo.longitude],
  timezone: record.timeZoneId,
  date,
  fajr: 19,
  isha: 10,
  highLatitudeRule: "AngleBased",
  ...overrides,
});

const buildValidationSchedule = (
  record: MasjidRecord,
  localDate: LocalDateParts,
): ValidationSchedule => {
  const validationDate = toDateAtLocalHour(localDate, record.timeZoneId, 12, 0);
  const baseTimes = calculatePrayerTimes(
    buildPrayerConfig(record, validationDate, {}),
    validationDate,
  );
  const standardAsr = calculatePrayerTimes(
    buildPrayerConfig(record, validationDate, { asrSchool: "Standard" }),
    validationDate,
  );
  const hanafiAsr = calculatePrayerTimes(
    buildPrayerConfig(record, validationDate, { asrSchool: "Hanafi" }),
    validationDate,
  );

  const standardBoundary = toComparableBoundary(
    standardAsr.asr,
    localDate,
    record.timeZoneId,
  );
  const hanafiBoundary = toComparableBoundary(
    hanafiAsr.asr,
    localDate,
    record.timeZoneId,
  );

  return {
    fajrBoundary: toComparableBoundary(
      baseTimes.fajr,
      localDate,
      record.timeZoneId,
    ),
    sunrise: toComparableBoundary(
      baseTimes.sunrise,
      localDate,
      record.timeZoneId,
    ),
    dhuhr: toComparableBoundary(baseTimes.dhuhr, localDate, record.timeZoneId),
    asrStandard: standardBoundary,
    earliestAsr:
      standardBoundary.comparableMinutes <= hanafiBoundary.comparableMinutes
        ? standardBoundary
        : hanafiBoundary,
    sunset: toComparableBoundary(
      baseTimes.sunset,
      localDate,
      record.timeZoneId,
    ),
    ishaBoundary: toComparableBoundary(
      baseTimes.isha,
      localDate,
      record.timeZoneId,
    ),
    highLatitude: Math.abs(record.geo.latitude) >= HIGH_LATITUDE_THRESHOLD,
    localDate: formatLocalDate(localDate),
  };
};

const isParseableTime = (
  parsed: ReturnType<typeof parsePrayerValue>,
): parsed is ParseablePrayerValue => parsed.kind === "time";

const pushValidationIssue = (
  target: string[],
  field: string,
  message: string,
): void => {
  target.push(`${field} ${message}`);
};

const validateForLocalDate = (
  record: MasjidRecord,
  localDate: LocalDateParts,
  toleranceMinutes: number,
  dateOffset: number,
): ValidationCandidate => {
  const errors: string[] = [];
  const warnings: string[] = [];

  let schedule: ValidationSchedule;
  try {
    schedule = buildValidationSchedule(record, localDate);
  } catch (error: unknown) {
    return {
      errors: [
        `validation unavailable for ${formatLocalDate(localDate)}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ],
      warnings,
      localDate: formatLocalDate(localDate),
      dateOffset,
    };
  }

  const fajr = parsePrayerValue(record.fajrIqama, "fajr");
  if (isParseableTime(fajr)) {
    if (fajr.comparableMinutes < schedule.fajrBoundary.comparableMinutes) {
      pushValidationIssue(
        schedule.highLatitude ? warnings : errors,
        "fajrIqama",
        `(${fajr.normalized}) is earlier than ${schedule.fajrBoundary.label} Fajr boundary on ${schedule.localDate}`,
      );
    }
    if (fajr.comparableMinutes >= schedule.sunrise.comparableMinutes) {
      pushValidationIssue(
        errors,
        "fajrIqama",
        `(${fajr.normalized}) must be before sunrise ${schedule.sunrise.label} on ${schedule.localDate}`,
      );
    }
  } else if (fajr.kind === "unparseable") {
    pushValidationIssue(
      warnings,
      "fajrIqama",
      `could not be parsed (${fajr.raw})`,
    );
  }

  const zuhr = parsePrayerValue(record.zuhrIqama, "zuhr");
  if (isParseableTime(zuhr)) {
    if (zuhr.comparableMinutes < schedule.dhuhr.comparableMinutes) {
      pushValidationIssue(
        errors,
        "zuhrIqama",
        `(${zuhr.normalized}) must be after dhuhr ${schedule.dhuhr.label} on ${schedule.localDate}`,
      );
    }
    if (zuhr.comparableMinutes >= schedule.earliestAsr.comparableMinutes) {
      pushValidationIssue(
        errors,
        "zuhrIqama",
        `(${zuhr.normalized}) must be before asr ${schedule.earliestAsr.label} on ${schedule.localDate}`,
      );
    }
  } else if (zuhr.kind === "unparseable") {
    pushValidationIssue(
      warnings,
      "zuhrIqama",
      `could not be parsed (${zuhr.raw})`,
    );
  }

  const asr = parsePrayerValue(record.asrIqama, "asr");
  if (isParseableTime(asr)) {
    if (asr.comparableMinutes >= schedule.sunset.comparableMinutes) {
      pushValidationIssue(
        errors,
        "asrIqama",
        `(${asr.normalized}) must be before sunset ${schedule.sunset.label} on ${schedule.localDate}`,
      );
    }
    if (
      asr.comparableMinutes <
      schedule.asrStandard.comparableMinutes - toleranceMinutes
    ) {
      pushValidationIssue(
        warnings,
        "asrIqama",
        `(${asr.normalized}) is earlier than asr ${schedule.asrStandard.label} by more than ${toleranceMinutes} minutes`,
      );
    }
  } else if (asr.kind === "unparseable") {
    pushValidationIssue(
      warnings,
      "asrIqama",
      `could not be parsed (${asr.raw})`,
    );
  }

  const maghrib = parsePrayerValue(record.maghribIqama, "maghrib");
  if (isParseableTime(maghrib)) {
    if (maghrib.comparableMinutes < schedule.sunset.comparableMinutes) {
      pushValidationIssue(
        errors,
        "maghribIqama",
        `(${maghrib.normalized}) must be at or after sunset ${schedule.sunset.label} on ${schedule.localDate}`,
      );
    }
    if (
      maghrib.comparableMinutes >
      schedule.sunset.comparableMinutes + MAGHRIB_LATE_WARNING_MINUTES
    ) {
      pushValidationIssue(
        warnings,
        "maghribIqama",
        `(${maghrib.normalized}) is more than ${MAGHRIB_LATE_WARNING_MINUTES} minutes after sunset ${schedule.sunset.label}`,
      );
    }
  } else if (maghrib.kind === "unparseable") {
    pushValidationIssue(
      warnings,
      "maghribIqama",
      `could not be parsed (${maghrib.raw})`,
    );
  }

  const isha = parsePrayerValue(record.ishaIqama, "isha");
  if (isParseableTime(isha)) {
    if (isha.comparableMinutes <= schedule.sunset.comparableMinutes) {
      pushValidationIssue(
        errors,
        "ishaIqama",
        `(${isha.normalized}) must be after sunset ${schedule.sunset.label} on ${schedule.localDate}`,
      );
    }
    if (isha.comparableMinutes < schedule.ishaBoundary.comparableMinutes) {
      pushValidationIssue(
        schedule.highLatitude ? warnings : errors,
        "ishaIqama",
        `(${isha.normalized}) is earlier than ${schedule.ishaBoundary.label} Isha boundary on ${schedule.localDate}`,
      );
    }
  } else if (isha.kind === "unparseable") {
    pushValidationIssue(
      warnings,
      "ishaIqama",
      `could not be parsed (${isha.raw})`,
    );
  }

  const jumaFields = [
    ["juma1", parsePrayerValue(record.juma1, "zuhr")],
    ["juma2", parsePrayerValue(record.juma2, "zuhr")],
    ["juma3", parsePrayerValue(record.juma3, "zuhr")],
  ] as const;
  const parseableJumas = jumaFields.filter(
    (
      entry,
    ): entry is readonly ["juma1" | "juma2" | "juma3", ParseablePrayerValue] =>
      entry[1].kind === "time",
  );
  for (const [field, value] of parseableJumas) {
    if (value.comparableMinutes >= schedule.earliestAsr.comparableMinutes) {
      pushValidationIssue(
        errors,
        field,
        `(${value.normalized}) must be before asr ${schedule.earliestAsr.label} on ${schedule.localDate}`,
      );
    }
  }

  for (const [field, value] of jumaFields) {
    if (value.kind === "unparseable") {
      pushValidationIssue(
        warnings,
        field,
        `could not be parsed (${value.raw})`,
      );
    }
  }

  if (parseableJumas.length >= 2) {
    const jumaMinutes = parseableJumas.map(
      ([, value]) => value.comparableMinutes,
    );
    for (let index = 1; index < jumaMinutes.length; index += 1) {
      const previous = jumaMinutes[index - 1];
      const current = jumaMinutes[index];
      if (previous === undefined || current === undefined) {
        continue;
      }
      if (current < previous) {
        warnings.push("juma times are not in ascending order");
        break;
      }
    }
  }

  const dailyComparable = [
    ["fajrIqama", isParseableTime(fajr) ? fajr.comparableMinutes : undefined],
    ["zuhrIqama", isParseableTime(zuhr) ? zuhr.comparableMinutes : undefined],
    ["asrIqama", isParseableTime(asr) ? asr.comparableMinutes : undefined],
    [
      "maghribIqama",
      maghrib.kind === "special"
        ? schedule.sunset.comparableMinutes
        : isParseableTime(maghrib)
          ? maghrib.comparableMinutes
          : undefined,
    ],
    ["ishaIqama", isParseableTime(isha) ? isha.comparableMinutes : undefined],
  ] as const;
  const parseableDaily = dailyComparable.filter(
    ([, comparableMinutes]) => comparableMinutes !== undefined,
  );

  for (let index = 1; index < parseableDaily.length; index += 1) {
    const previous = parseableDaily[index - 1];
    const current = parseableDaily[index];
    const previousMinutes = previous?.[1];
    const currentMinutes = current?.[1];
    if (
      previousMinutes === undefined ||
      currentMinutes === undefined ||
      !previous ||
      !current
    ) {
      continue;
    }

    if (currentMinutes <= previousMinutes) {
      warnings.push(
        `daily iqama order is not ascending (${previous[0]} then ${current[0]})`,
      );
      break;
    }
  }

  const uniqueDailyTimes = new Set(
    parseableDaily
      .map(([, comparableMinutes]) => comparableMinutes)
      .filter((value): value is number => value !== undefined),
  );
  if (parseableDaily.length >= 3 && uniqueDailyTimes.size <= 1) {
    warnings.push("daily iqama times are all identical");
  }

  return {
    errors,
    warnings,
    localDate: schedule.localDate,
    dateOffset,
  };
};

export const validateCrawlRecord = (
  record: MasjidRecord,
): CrawlValidationResult => {
  const crawlTime =
    record.crawlTime instanceof Date ? record.crawlTime : new Date();
  let localDate: LocalDateParts;
  try {
    localDate = getLocalDateParts(crawlTime, record.timeZoneId);
  } catch (error: unknown) {
    return {
      errors: [
        `validation unavailable: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ],
      warnings: [],
    };
  }
  const initial = validateForLocalDate(
    record,
    localDate,
    DEFAULT_TOLERANCE_MINUTES,
    0,
  );

  if (initial.errors.length === 0) {
    return {
      errors: initial.errors,
      warnings: initial.warnings,
    };
  }

  const alternatives = [
    validateForLocalDate(
      record,
      addLocalDays(localDate, -1),
      DEFAULT_TOLERANCE_MINUTES,
      -1,
    ),
    validateForLocalDate(
      record,
      addLocalDays(localDate, 1),
      DEFAULT_TOLERANCE_MINUTES,
      1,
    ),
  ];
  const best = alternatives.reduce(
    (currentBest, candidate) =>
      candidate.errors.length < currentBest.errors.length
        ? candidate
        : currentBest,
    initial,
  );

  if (best.dateOffset === 0 || best.errors.length >= initial.errors.length) {
    return {
      errors: initial.errors,
      warnings: initial.warnings,
    };
  }

  return {
    errors: best.errors,
    warnings: [
      ...best.warnings,
      `validation only passed on adjacent local date ${best.localDate}`,
    ],
  };
};
