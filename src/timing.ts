export type PrayerContext = "fajr" | "zuhr" | "asr" | "maghrib" | "isha";

export type TimeField =
  | "fajrIqama"
  | "zuhrIqama"
  | "asrIqama"
  | "maghribIqama"
  | "ishaIqama"
  | "juma1"
  | "juma2"
  | "juma3";

export type ModifiedField =
  | "fajrIqamaModified"
  | "zuhrIqamaModified"
  | "asrIqamaModified"
  | "maghribIqamaModified"
  | "ishaIqamaModified"
  | "juma1Modified"
  | "juma2Modified"
  | "juma3Modified";

export interface TimeFieldConfig {
  timeField: TimeField;
  modifiedField: ModifiedField;
  prayer: PrayerContext;
  diffLabel: string;
  deletedLabel: string;
}

export const timeFieldConfigs: readonly TimeFieldConfig[] = [
  {
    timeField: "fajrIqama",
    modifiedField: "fajrIqamaModified",
    prayer: "fajr",
    diffLabel: "Fajr",
    deletedLabel: "Fajr",
  },
  {
    timeField: "zuhrIqama",
    modifiedField: "zuhrIqamaModified",
    prayer: "zuhr",
    diffLabel: "Zuhr",
    deletedLabel: "Zuhr",
  },
  {
    timeField: "asrIqama",
    modifiedField: "asrIqamaModified",
    prayer: "asr",
    diffLabel: "Asr",
    deletedLabel: "Asr",
  },
  {
    timeField: "maghribIqama",
    modifiedField: "maghribIqamaModified",
    prayer: "maghrib",
    diffLabel: "Maghrib",
    deletedLabel: "Maghrib",
  },
  {
    timeField: "ishaIqama",
    modifiedField: "ishaIqamaModified",
    prayer: "isha",
    diffLabel: "Isha",
    deletedLabel: "Isha",
  },
  {
    timeField: "juma1",
    modifiedField: "juma1Modified",
    prayer: "zuhr",
    diffLabel: "Juma",
    deletedLabel: "Juma1",
  },
  {
    timeField: "juma2",
    modifiedField: "juma2Modified",
    prayer: "zuhr",
    diffLabel: "Juma",
    deletedLabel: "Juma2",
  },
  {
    timeField: "juma3",
    modifiedField: "juma3Modified",
    prayer: "zuhr",
    diffLabel: "Juma",
    deletedLabel: "Juma3",
  },
] as const;

const timeRxG = /(\d{1,2})\s*:\s*(\d{1,2})/g;
const normalizedClockRx = /^(\d+):(\d+)([ap])$/i;

const htmlEscapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&#34;",
  "'": "&#39;",
};

const placeholderValues = new Set([
  "",
  "-",
  "--",
  "check website",
  "check site",
  "website",
  "web site",
  "n/a",
  "na",
  "tbd",
  "tba",
]);

export type ParsedPrayerValue =
  | {
      kind: "empty";
      raw: string;
    }
  | {
      kind: "placeholder";
      placeholder: string;
      raw: string;
    }
  | {
      kind: "special";
      raw: string;
      special: "sunset";
    }
  | {
      comparableMinutes: number;
      kind: "time";
      minutes: number;
      normalized: string;
      raw: string;
    }
  | {
      kind: "unparseable";
      raw: string;
      reason: "ambiguous" | "invalid" | "missing_clock";
    };

export const toStringValue = (value: unknown): string =>
  typeof value === "string" ? value : "";

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (match) => htmlEscapeMap[match] ?? match);

const normalizeTextToken = (value: string): string =>
  value.trim().replace(/\s+/g, " ").toLowerCase();

const comparableMinutesForPrayer = (
  minutes: number,
  normalized: string,
  prayer: PrayerContext,
): number => {
  if (prayer === "isha" && normalized.toLowerCase().endsWith("a")) {
    return minutes + 1_440;
  }

  return minutes;
};

export const normalizeTime = (
  value: string | undefined,
  prayer: PrayerContext,
): string[] => {
  const text = value ?? "";
  const result: string[] = [];

  for (const match of text.matchAll(timeRxG)) {
    const hourText = match[1];
    const minuteText = match[2];
    if (!hourText || !minuteText) {
      continue;
    }

    let hour = Number.parseInt(hourText, 10);
    const minute = Number.parseInt(minuteText, 10);

    if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
      continue;
    }

    if (hour > 12) {
      hour -= 12;
    }

    let meridiem: "a" | "p" = "p";
    switch (prayer) {
      case "fajr":
        meridiem = "a";
        break;
      case "zuhr":
        meridiem = hour === 10 || hour === 11 ? "a" : "p";
        break;
      case "asr":
      case "maghrib":
        meridiem = "p";
        break;
      case "isha":
        meridiem = hour === 12 || hour === 1 ? "a" : "p";
        break;
    }

    result.push(`${hour}:${String(minute).padStart(2, "0")}${meridiem}`);
  }

  return result;
};

export const normalizePrayerFieldValue = (
  value: unknown,
  prayer: PrayerContext,
): string => {
  const text = toStringValue(value);
  const normalized = normalizeTime(text, prayer);
  const onlyMatch = normalized[0];

  if (normalized.length === 1 && onlyMatch) {
    return onlyMatch;
  }

  if (text.length === 0) {
    return text;
  }

  return escapeHtml(text);
};

export const hourMinutesToMinutes = (value: string): number => {
  const match = normalizedClockRx.exec(value);
  if (!match) {
    throw new Error("invalid time");
  }

  const hourText = match[1];
  const minuteText = match[2];
  const meridiem = match[3]?.toLowerCase();
  if (!hourText || !minuteText || !meridiem) {
    throw new Error("invalid time");
  }

  let hour = Number.parseInt(hourText, 10);
  const minute = Number.parseInt(minuteText, 10);
  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 12 ||
    minute < 0 ||
    minute > 59 ||
    (meridiem !== "a" && meridiem !== "p")
  ) {
    throw new Error("invalid time");
  }

  if (hour === 12) {
    hour = 0;
  }
  if (meridiem === "p") {
    hour += 12;
  }

  return hour * 60 + minute;
};

const parseNormalizedClock = (
  raw: string,
  normalized: string,
  prayer: PrayerContext,
): ParsedPrayerValue => {
  try {
    const minutes = hourMinutesToMinutes(normalized);
    return {
      comparableMinutes: comparableMinutesForPrayer(
        minutes,
        normalized,
        prayer,
      ),
      kind: "time",
      minutes,
      normalized,
      raw,
    };
  } catch {
    return {
      kind: "unparseable",
      raw,
      reason: "invalid",
    };
  }
};

export const parsePrayerValue = (
  value: unknown,
  prayer: PrayerContext,
): ParsedPrayerValue => {
  const raw = toStringValue(value).trim();
  const normalizedText = normalizeTextToken(raw);

  if (normalizedText.length === 0) {
    return { kind: "empty", raw };
  }

  if (normalizedText === "sunset") {
    return {
      kind: "special",
      raw,
      special: "sunset",
    };
  }

  if (placeholderValues.has(normalizedText)) {
    return {
      kind: "placeholder",
      placeholder: normalizedText,
      raw,
    };
  }

  if (normalizedClockRx.test(raw)) {
    return parseNormalizedClock(raw, raw.toLowerCase(), prayer);
  }

  const normalized = normalizeTime(raw, prayer);
  const onlyMatch = normalized[0];
  if (normalized.length === 1 && onlyMatch) {
    return parseNormalizedClock(raw, onlyMatch, prayer);
  }

  if (normalized.length > 1) {
    return {
      kind: "unparseable",
      raw,
      reason: "ambiguous",
    };
  }

  return {
    kind: "unparseable",
    raw,
    reason: "missing_clock",
  };
};
