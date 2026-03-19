import { expect, test } from "bun:test";

import {
  compareToPrevious,
  hourMinutesToMinutes,
  normalizePrayerTimes,
  normalizeTime,
  type PrayerEventRecord,
  PraytimeSaver,
} from "../src/save";
import type { CrawlOutputLine } from "../src/types";

const baseRecord = (
  overrides: Partial<PrayerEventRecord> = {},
): PrayerEventRecord => ({
  uuid4: "00000000-0000-0000-0000-000000000000",
  name: "Sample Masjid",
  url: "https://example.com",
  timeZoneId: "America/Chicago",
  geo: {
    latitude: 1,
    longitude: 2,
  },
  ...overrides,
});

const createSaverFixtures = () => {
  let savedRecord: PrayerEventRecord | null = null;
  const firestore = {
    collection: () => ({
      doc: () => ({
        get: async () => ({
          exists: false,
          data: () => undefined,
        }),
        set: async (payload: PrayerEventRecord) => {
          savedRecord = payload;
        },
      }),
    }),
    terminate: async () => {},
  };
  const messaging = {
    send: async () => "mock-message-id",
  };

  return {
    firestore,
    getSavedRecord: () => savedRecord,
    messaging,
  };
};

const createValidationErrorLine = (): CrawlOutputLine => ({
  source: "US/IL/sample",
  error: "validation: maghribIqama must be after sunset",
  validationErrors: ["maghribIqama must be after sunset"],
  result: baseRecord({
    maghribIqama: "1:00p",
  }),
});

const withMutedConsoleError = async (run: () => Promise<void>) => {
  const originalError = console.error;
  console.error = () => {};

  try {
    await run();
  } finally {
    console.error = originalError;
  }
};

const saveValidationErrorLine = async (options: { force?: boolean } = {}) => {
  const { firestore, getSavedRecord, messaging } = createSaverFixtures();
  const saver = new PraytimeSaver({
    force: options.force,
    firestore: firestore as never,
    messaging: messaging as never,
  });
  const line = createValidationErrorLine();
  let result: Awaited<ReturnType<typeof saver.saveLine>> | undefined;

  try {
    await withMutedConsoleError(async () => {
      result = await saver.saveLine(line);
    });

    return {
      line,
      result,
      savedRecord: getSavedRecord(),
    };
  } finally {
    await saver.close();
  }
};

test("normalizeTime keeps Go-compatible prayer meridiem behavior", () => {
  expect(normalizeTime("01:00", "zuhr")).toEqual(["1:00p"]);
  expect(normalizeTime("23:00", "isha")).toEqual(["11:00p"]);
  expect(normalizeTime("11:00", "zuhr")).toEqual(["11:00a"]);
  expect(normalizeTime("sunset", "maghrib")).toEqual([]);
  expect(normalizeTime("11:00 am 12:00 pm", "zuhr")).toEqual([
    "11:00a",
    "12:00p",
  ]);
});

test("hourMinutesToMinutes converts normalized times", () => {
  expect(hourMinutesToMinutes("01:00a")).toBe(60);
  expect(hourMinutesToMinutes("12:00p")).toBe(720);
  expect(hourMinutesToMinutes("12:00a")).toBe(0);
  expect(hourMinutesToMinutes("11:59p")).toBe(1439);
  expect(() => hourMinutesToMinutes("25:00p")).toThrow(/invalid time/);
});

test("normalizePrayerTimes escapes unparseable values", () => {
  const record = baseRecord({
    fajrIqama: "sunrise & after",
    zuhrIqama: "01:00",
  });

  normalizePrayerTimes(record);

  expect(record.fajrIqama).toBe("sunrise &amp; after");
  expect(record.zuhrIqama).toBe("1:00p");
});

test("compareToPrevious appends diff and sets modified time on meaningful change", () => {
  const previousZuhrModified = new Date("2024-01-02T03:04:05.000Z");
  const current = baseRecord({
    fajrIqama: "5:10a",
    zuhrIqama: "1:00p",
  });
  const previous = baseRecord({
    fajrIqama: "5:00a",
    zuhrIqama: "1:00p",
    zuhrIqamaModified: previousZuhrModified,
  });

  const before = Date.now();
  const { diff } = compareToPrevious(current, previous, false);
  const after = Date.now();

  expect(diff).toEqual(["Fajr: 5:10a"]);
  expect(current.zuhrIqamaModified?.toISOString()).toBe(
    previousZuhrModified.toISOString(),
  );
  expect(current.fajrIqamaModified).toBeInstanceOf(Date);
  const fajrModifiedMs = current.fajrIqamaModified?.getTime() ?? 0;
  expect(fajrModifiedMs >= before && fajrModifiedMs <= after).toBeTrue();
});

test("compareToPrevious ignores sub-4-minute adjustments", () => {
  const previousFajrModified = new Date("2024-01-02T03:04:05.000Z");
  const current = baseRecord({
    fajrIqama: "5:03a",
  });
  const previous = baseRecord({
    fajrIqama: "5:00a",
    fajrIqamaModified: previousFajrModified,
  });

  const { diff } = compareToPrevious(current, previous, false);

  expect(diff).toEqual([]);
  expect(current.fajrIqamaModified?.toISOString()).toBe(
    previousFajrModified.toISOString(),
  );
});

test("compareToPrevious blocks deletions unless forced", () => {
  const previous = baseRecord({
    fajrIqama: "5:00a",
  });

  expect(() => compareToPrevious(baseRecord(), previous, false)).toThrow(
    /Fajr is deleted/,
  );
});

test("compareToPrevious with force keeps previous modified timestamps", () => {
  const previousFajrModified = new Date("2024-01-02T03:04:05.000Z");
  const previous = baseRecord({
    fajrIqama: "5:00a",
    fajrIqamaModified: previousFajrModified,
  });
  const current = baseRecord();

  const { diff } = compareToPrevious(current, previous, true);

  expect(diff).toEqual([]);
  expect(current.fajrIqamaModified?.toISOString()).toBe(
    previousFajrModified.toISOString(),
  );
});

test("PraytimeSaver blocks validation errors without force", async () => {
  const { result, savedRecord } = await saveValidationErrorLine();

  expect(result).toEqual({
    outcome: "skipped",
    reason: "validation_error",
  });
  expect(savedRecord).toBeNull();
});

test("PraytimeSaver force-saves validation errors", async () => {
  const { line, result, savedRecord } = await saveValidationErrorLine({
    force: true,
  });

  expect(result).toEqual({
    outcome: "saved",
    updated: false,
  });
  expect(savedRecord?.uuid4).toBe(line.result.uuid4);
});

test("PraytimeSaver preserves event metadata fields like isStatic", async () => {
  const { firestore, getSavedRecord, messaging } = createSaverFixtures();
  const saver = new PraytimeSaver({
    firestore: firestore as never,
    messaging: messaging as never,
  });
  const line: CrawlOutputLine = {
    source: "US/IL/static",
    error: "",
    result: baseRecord({
      isStatic: true,
    }),
  };

  try {
    await withMutedConsoleError(async () => {
      const result = await saver.saveLine(line);
      expect(result).toEqual({
        outcome: "saved",
        updated: false,
      });
    });

    expect(getSavedRecord()?.isStatic).toBe(true);
  } finally {
    await saver.close();
  }
});
