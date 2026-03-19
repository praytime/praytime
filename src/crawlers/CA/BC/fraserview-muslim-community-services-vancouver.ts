import { calculatePrayerTimes } from "@masaajid/prayer-times";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_CSV_URL = "https://thefmcs.ca/assets/csv/prayer_fcms.csv";
const CONFIG_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1_LFdMB3YILxxTGsoDDZwKS97v966iSpIwjGLtUzsgpY/gviz/tq?tqx=out:csv&gid=0";
const TIME_ZONE_ID = "America/Vancouver";
const BCMA_LOCATION: [number, number] = [49.2263435, -123.1067579];

type PrayerCsvRow = {
  ashura: string;
  asr: string;
  dhur: string;
  fajr: string;
  isha: string;
  jumuah1: string;
  jumuah2: string;
  month: string;
};

const formatClock = (date: Date): string =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    timeZone: TIME_ZONE_ID,
  }).format(date);

const formatMinutes = (value: number): string => {
  const totalMinutes = ((value % 1_440) + 1_440) % 1_440;
  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const meridiem = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${meridiem}`;
};

const parseClockMinutes = (value: string): number => {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match?.[1] || !match[2]) {
    throw new Error(`invalid FMCS clock value: ${value}`);
  }

  const hour = Number.parseInt(match[1], 10);
  const minute = Number.parseInt(match[2], 10);
  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    throw new Error(`invalid FMCS clock value: ${value}`);
  }

  return hour * 60 + minute;
};

const getTimeZoneOffsetMinutes = (date: Date, timeZoneId: string): number => {
  const offsetText = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timeZoneId,
    timeZoneName: "shortOffset",
  })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName")?.value;

  const match = /^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/.exec(offsetText ?? "");
  if (!match?.[1] || !match[2]) {
    return 0;
  }

  const sign = match[1] === "-" ? 1 : -1;
  const hours = Number.parseInt(match[2], 10);
  const minutes = Number.parseInt(match[3] ?? "0", 10);
  return sign * (hours * 60 + minutes);
};

const isDstInTimeZone = (date: Date, timeZoneId: string): boolean => {
  const year = Number.parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timeZoneId,
      year: "numeric",
    }).format(date),
    10,
  );

  const january = new Date(Date.UTC(year, 0, 1, 12, 0, 0));
  const july = new Date(Date.UTC(year, 6, 1, 12, 0, 0));
  const currentOffset = getTimeZoneOffsetMinutes(date, timeZoneId);
  return (
    currentOffset <
    Math.max(
      getTimeZoneOffsetMinutes(january, timeZoneId),
      getTimeZoneOffsetMinutes(july, timeZoneId),
    )
  );
};

const buildLocalDate = (): {
  day: number;
  monthIndex: number;
  monthName: string;
  year: number;
} => {
  const date = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE_ID,
    year: "numeric",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter(
        (part) =>
          part.type === "day" || part.type === "month" || part.type === "year",
      )
      .map((part) => [part.type, part.value]),
  );

  const year = Number.parseInt(String(values.year ?? ""), 10);
  const day = Number.parseInt(String(values.day ?? ""), 10);
  const monthName = String(values.month ?? "");
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();

  if (!year || !day || !monthName || Number.isNaN(monthIndex)) {
    throw new Error("failed to derive FMCS local date");
  }

  return { day, monthIndex, monthName, year };
};

const ashuraForDay = (day: number): string => {
  if (day < 11) {
    return "FIRST_ASHURA";
  }
  if (day > 20) {
    return "THIRD_ASHURA";
  }
  return "SECOND_ASHURA";
};

const parsePrayerCsvRows = (csvText: string): PrayerCsvRow[] => {
  const rows = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return rows.slice(1).map((line) => {
    const [
      ,
      month = "",
      ashura = "",
      fajr = "",
      dhur = "",
      jumuah1 = "",
      jumuah2 = "",
      asr = "",
      isha = "",
    ] = line.split(",");

    return {
      ashura,
      asr,
      dhur,
      fajr,
      isha,
      jumuah1,
      jumuah2,
      month,
    };
  });
};

const parseConfigValues = (csvText: string): Map<string, number> => {
  const values = new Map<string, number>();

  for (const line of csvText.split(/\r?\n/).slice(1)) {
    const match = /^"([^"]+)","([^"]*)"/.exec(line.trim());
    if (!match?.[1] || match[2] === undefined) {
      continue;
    }

    const parsed = Number.parseInt(match[2], 10);
    if (Number.isFinite(parsed)) {
      values.set(match[1], parsed);
    }
  }

  return values;
};

const configValue = (
  config: Map<string, number>,
  key: string,
  fallback: number,
): number => config.get(key) ?? fallback;

const formatCsvClock = (
  value: string,
  dstActive: boolean,
  extraMinutes = 0,
): string =>
  formatMinutes(parseClockMinutes(value) + (dstActive ? 60 : 0) + extraMinutes);

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c1a0a188-7058-4683-bc1b-f2613139ad3b",
    name: "Fraserview Muslim Community Services",
    url: "http://thefmcs.ca/",
    timeZoneId: "America/Vancouver",
    address: "6436 Fraser St, Vancouver, BC V5W 3A6, Canada",
    placeId: "ChIJ7SyIShV0hlQRDXG6F58w8n0",
    geo: {
      latitude: 49.2261277,
      longitude: -123.0905783,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for CA/BC/fraserview-muslim-community-services-vancouver",
    );
  }

  const [prayerCsvResponse, configCsvResponse] = await Promise.all([
    util.get<string>(PRAYER_CSV_URL),
    util.get<string>(CONFIG_CSV_URL),
  ]);

  if (
    typeof prayerCsvResponse.data !== "string" ||
    typeof configCsvResponse.data !== "string"
  ) {
    throw new Error("unexpected FMCS csv response type");
  }

  const localDate = buildLocalDate();
  const prayerRows = parsePrayerCsvRows(prayerCsvResponse.data);
  const prayerRow = prayerRows.find(
    (row) =>
      row.month === localDate.monthName &&
      row.ashura === ashuraForDay(localDate.day),
  );

  if (!prayerRow) {
    throw new Error(
      `missing FMCS prayer row for ${localDate.monthName} ${localDate.day}`,
    );
  }

  const config = parseConfigValues(configCsvResponse.data);
  const date = new Date(
    Date.UTC(localDate.year, localDate.monthIndex, localDate.day, 12, 0, 0),
  );
  const dstActive = isDstInTimeZone(date, TIME_ZONE_ID);
  const calculated = calculatePrayerTimes(
    {
      asrSchool: "Standard",
      date,
      fajr: 18,
      highLatitudeRule: "NightMiddle",
      isha: 15,
      location: BCMA_LOCATION,
      maghrib: "1 min",
      method: "Custom",
      timezone: TIME_ZONE_ID,
    },
    date,
  );

  const isRamadan = configValue(config, "isRamadan", 0) === 1;
  const fajr =
    isRamadan && configValue(config, "isFajrRamadanOverride", 1) === 1
      ? formatClock(
          new Date(
            calculated.fajr.getTime() +
              configValue(config, "fajrIqamaRamadan", 20) * 60_000,
          ),
        )
      : formatCsvClock(
          prayerRow.fajr,
          dstActive,
          configValue(config, "fajrOverride", 0) + 10,
        );
  const zuhr = formatCsvClock(prayerRow.dhur, dstActive, 10);
  const asr = formatCsvClock(
    prayerRow.asr,
    dstActive,
    configValue(config, "asrOverride", 0) + 10,
  );
  const maghrib = formatClock(
    new Date(
      calculated.maghrib.getTime() +
        (isRamadan && configValue(config, "isMaghribRamadanOverride", 1) === 1
          ? configValue(config, "maghribRamadan", 1)
          : 4) *
          60_000,
    ),
  );
  const isha =
    isRamadan && configValue(config, "isIshaRamadanOverride", 0) === 1
      ? formatClock(
          new Date(
            calculated.isha.getTime() +
              (configValue(config, "ishaAthanRamadan", 1) +
                configValue(config, "ishaIqamaRamadan", 10)) *
                60_000,
          ),
        )
      : formatCsvClock(
          prayerRow.isha,
          dstActive,
          configValue(config, "ishaOverride", 0) + 10,
        );

  util.setIqamaTimes(masjid, [fajr, zuhr, asr, maghrib, isha]);
  util.setJumaTimes(masjid, [
    formatCsvClock(prayerRow.jumuah1, dstActive),
    formatCsvClock(
      prayerRow.jumuah2,
      dstActive,
      configValue(config, "jumuah2Override", 0),
    ),
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/fraserview-muslim-community-services-vancouver",
  ids,
  run,
};
