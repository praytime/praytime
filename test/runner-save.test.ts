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
