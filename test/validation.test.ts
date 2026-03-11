import { expect, test } from "bun:test";
import { calculatePrayerTimes } from "@masaajid/prayer-times";

import { parsePrayerValue } from "../src/timing";
import type { MasjidRecord } from "../src/types";
import { validateCrawlRecord } from "../src/validation";

const addMinutes = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * 60_000);

const toNormalizedTime = (date: Date, timeZone: string): string => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);
  const hour = parts.find((part) => part.type === "hour")?.value;
  const minute = parts.find((part) => part.type === "minute")?.value;
  const period = parts.find((part) => part.type === "dayPeriod")?.value;

  if (!hour || !minute || !period) {
    throw new Error(`failed to format normalized time for ${timeZone}`);
  }

  return `${hour}:${minute}${period.toLowerCase() === "am" ? "a" : "p"}`;
};

const baseRecord = (overrides: Partial<MasjidRecord> = {}): MasjidRecord => ({
  uuid4: "00000000-0000-0000-0000-000000000000",
  name: "Sample Masjid",
  url: "https://example.com",
  timeZoneId: "America/Chicago",
  geo: {
    latitude: 41.8781,
    longitude: -87.6298,
  },
  crawlTime: new Date("2026-03-11T18:00:00.000Z"),
  ...overrides,
});

const computeTimes = (
  record: MasjidRecord,
  date: Date,
  overrides: Record<string, unknown> = {},
) =>
  calculatePrayerTimes(
    {
      method: "Custom",
      location: [record.geo.latitude, record.geo.longitude],
      timezone: record.timeZoneId,
      date,
      fajr: 19,
      isha: 10,
      highLatitudeRule: "AngleBased",
      ...overrides,
    },
    date,
  );

const buildValidRecord = (record: MasjidRecord): MasjidRecord => {
  const crawlTime =
    record.crawlTime instanceof Date ? record.crawlTime : new Date();
  const baseTimes = computeTimes(record, crawlTime);
  const standardAsr = computeTimes(record, crawlTime, {
    asrSchool: "Standard",
  });

  return {
    ...record,
    fajrIqama: toNormalizedTime(
      addMinutes(baseTimes.fajr, 20),
      record.timeZoneId,
    ),
    zuhrIqama: toNormalizedTime(
      addMinutes(baseTimes.dhuhr, 10),
      record.timeZoneId,
    ),
    asrIqama: toNormalizedTime(
      addMinutes(standardAsr.asr, 10),
      record.timeZoneId,
    ),
    maghribIqama: "sunset",
    ishaIqama: toNormalizedTime(
      addMinutes(baseTimes.isha, 10),
      record.timeZoneId,
    ),
    juma1: toNormalizedTime(addMinutes(baseTimes.dhuhr, 30), record.timeZoneId),
  };
};

const findAdjacentDateRecord = (): MasjidRecord => {
  for (let month = 1; month <= 12; month += 1) {
    for (let day = 1; day <= 27; day += 1) {
      const record = baseRecord({
        crawlTime: new Date(
          `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T17:00:00.000Z`,
        ),
      });
      const crawlTime = record.crawlTime as Date;
      const today = computeTimes(record, crawlTime);
      const tomorrow = computeTimes(record, addMinutes(crawlTime, 1_440));

      const todayFajr = parsePrayerValue(
        toNormalizedTime(today.fajr, record.timeZoneId),
        "fajr",
      );
      const tomorrowFajr = parsePrayerValue(
        toNormalizedTime(tomorrow.fajr, record.timeZoneId),
        "fajr",
      );

      if (
        todayFajr.kind === "time" &&
        tomorrowFajr.kind === "time" &&
        todayFajr.comparableMinutes - tomorrowFajr.comparableMinutes >= 2
      ) {
        return {
          ...buildValidRecord(record),
          fajrIqama: toNormalizedTime(
            addMinutes(today.fajr, -1),
            record.timeZoneId,
          ),
        };
      }
    }
  }

  throw new Error("failed to find adjacent-date fajr rollover scenario");
};

test("validateCrawlRecord accepts plausible iqama output", () => {
  const result = validateCrawlRecord(buildValidRecord(baseRecord()));

  expect(result.errors).toEqual([]);
  expect(result.warnings).toEqual([]);
});

test("validateCrawlRecord rejects hard boundary violations", () => {
  const record = buildValidRecord(baseRecord());
  const crawlTime = record.crawlTime as Date;
  const baseTimes = computeTimes(record, crawlTime);

  const result = validateCrawlRecord({
    ...record,
    fajrIqama: toNormalizedTime(
      addMinutes(baseTimes.fajr, -15),
      record.timeZoneId,
    ),
    maghribIqama: toNormalizedTime(
      addMinutes(baseTimes.sunset, -10),
      record.timeZoneId,
    ),
  });

  expect(result.errors).toContainEqual(expect.stringContaining("fajrIqama"));
  expect(result.errors).toContainEqual(expect.stringContaining("maghribIqama"));
});

test("validateCrawlRecord warns when asr is too early without hard failing", () => {
  const record = buildValidRecord(baseRecord());
  const crawlTime = record.crawlTime as Date;
  const standardAsr = computeTimes(record, crawlTime, {
    asrSchool: "Standard",
  });

  const result = validateCrawlRecord({
    ...record,
    asrIqama: toNormalizedTime(
      addMinutes(standardAsr.asr, -10),
      record.timeZoneId,
    ),
  });

  expect(result.errors).toEqual([]);
  expect(result.warnings).toContainEqual(expect.stringContaining("asrIqama"));
});

test("validateCrawlRecord retries adjacent local dates for rollover cases", () => {
  const result = validateCrawlRecord(findAdjacentDateRecord());

  expect(result.errors).toEqual([]);
  expect(result.warnings).toContainEqual(
    expect.stringContaining("adjacent local date"),
  );
});

test("validateCrawlRecord downgrades fajr envelope checks at high latitude", () => {
  const record = buildValidRecord(
    baseRecord({
      timeZoneId: "America/Anchorage",
      geo: {
        latitude: 61.2181,
        longitude: -149.9003,
      },
      crawlTime: new Date("2026-06-20T20:00:00.000Z"),
    }),
  );
  const crawlTime = record.crawlTime as Date;
  const baseTimes = computeTimes(record, crawlTime);

  const result = validateCrawlRecord({
    ...record,
    fajrIqama: toNormalizedTime(
      addMinutes(baseTimes.fajr, -10),
      record.timeZoneId,
    ),
  });

  expect(result.errors).toEqual([]);
  expect(result.warnings).toContainEqual(expect.stringContaining("fajrIqama"));
});

test("parsePrayerValue rolls after-midnight isha into next-day comparable minutes", () => {
  const parsed = parsePrayerValue("12:15a", "isha");

  expect(parsed.kind).toBe("time");
  if (parsed.kind !== "time") {
    throw new Error("expected parsePrayerValue to return a time");
  }

  expect(parsed.minutes).toBe(15);
  expect(parsed.comparableMinutes).toBe(1_455);
});
