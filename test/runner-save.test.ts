import { expect, test } from "bun:test";

import { runCrawlers } from "../src/runner";
import type { CrawlerModule, CrawlOutputLine } from "../src/types";

const sampleRecord = {
  uuid4: "00000000-0000-0000-0000-000000000000",
  name: "Sample Masjid",
  url: "https://example.com",
  timeZoneId: "America/New_York",
  geo: {
    latitude: 0,
    longitude: 0,
  },
};

test("runCrawlers suppresses stdout when emitJson is false and still calls onOutput", async () => {
  const crawler: CrawlerModule = {
    name: "US/GA/sample",
    ids: [{ ...sampleRecord }],
  };

  const lines: CrawlOutputLine[] = [];
  const originalLog = console.log;
  const logged: unknown[][] = [];
  console.log = (...args: unknown[]) => {
    logged.push(args);
  };

  try {
    await runCrawlers([crawler], {
      emitJson: false,
      onOutput: (line) => {
        lines.push(line);
      },
    });
  } finally {
    console.log = originalLog;
  }

  expect(logged).toHaveLength(0);
  expect(lines).toHaveLength(1);
  expect(lines[0]?.source).toBe("US/GA/sample");
  expect(lines[0]?.error).toBe("");
  expect(lines[0]?.result.uuid4).toBe(sampleRecord.uuid4);
  expect(lines[0]?.result.geohash).toBeDefined();
  expect(lines[0]?.result.crawlTime).toBeInstanceOf(Date);
});

test("runCrawlers suppresses output for env-skipped puppeteer crawlers", async () => {
  const previousEnv = process.env.PUPPETEER_DISABLED;
  process.env.PUPPETEER_DISABLED = "1";

  let runCalled = false;
  const crawler: CrawlerModule = {
    name: "US/GA/puppeteer",
    ids: [{ ...sampleRecord }],
    puppeteer: true,
    run: () => {
      runCalled = true;
      return [
        {
          ...sampleRecord,
          fajrIqama: "5:15a",
        },
      ];
    },
  };

  const lines: CrawlOutputLine[] = [];
  const completions: {
    skippedReason?: string;
    runInvoked: boolean;
    emittedCount: number;
  }[] = [];
  const originalLog = console.log;
  const originalError = console.error;
  const logged: unknown[][] = [];
  console.log = (...args: unknown[]) => {
    logged.push(args);
  };
  console.error = () => {};

  try {
    await runCrawlers([crawler], {
      onOutput: (line) => {
        lines.push(line);
      },
      onCrawlerComplete: (event) => {
        completions.push({
          skippedReason: event.skippedReason,
          runInvoked: event.runInvoked,
          emittedCount: event.emittedCount,
        });
      },
    });
  } finally {
    console.log = originalLog;
    console.error = originalError;
    if (previousEnv === undefined) {
      delete process.env.PUPPETEER_DISABLED;
    } else {
      process.env.PUPPETEER_DISABLED = previousEnv;
    }
  }

  expect(runCalled).toBe(false);
  expect(logged).toHaveLength(0);
  expect(lines).toHaveLength(0);
  expect(completions).toEqual([
    {
      skippedReason: "env-puppeteer-disabled",
      runInvoked: false,
      emittedCount: 0,
    },
  ]);
});

test("runCrawlers downgrades invalid fields to check website before emitting", async () => {
  const crawler: CrawlerModule = {
    name: "US/GA/validation",
    ids: [
      {
        ...sampleRecord,
        geo: {
          latitude: 40.7128,
          longitude: -74.006,
        },
        crawlTime: new Date("2026-03-11T18:00:00.000Z"),
        maghribIqama: "1:00p",
      },
    ],
  };

  const lines: CrawlOutputLine[] = [];
  const originalError = console.error;
  console.error = () => {};

  try {
    await runCrawlers([crawler], {
      emitJson: false,
      onOutput: (line) => {
        lines.push(line);
      },
    });
  } finally {
    console.error = originalError;
  }

  expect(lines).toHaveLength(1);
  expect(lines[0]?.error).toBe("");
  expect(lines[0]?.validationErrors).toBeUndefined();
  expect(lines[0]?.result.maghribIqama).toBe("check website");
  expect(lines[0]?.validationWarnings).toContainEqual(
    expect.stringContaining("replaced invalid fields with check website"),
  );
});
