import { expect, test } from "bun:test";

import type { RunReport } from "../src/localdb";
import { formatRunReport } from "../src/report";

test("formatRunReport renders empty report sections", () => {
  const report: RunReport = {
    databasePath: "/tmp/praytime.sqlite",
    generatedAt: "2026-03-06T10:00:00.000Z",
    latestSession: null,
    recentSessions: [],
    crawlers: [],
  };

  const output = formatRunReport(report);

  expect(output).toContain("Database: /tmp/praytime.sqlite");
  expect(output).toContain("Latest Session");
  expect(output).toContain("No sessions recorded.");
  expect(output).toContain("No recent sessions recorded.");
  expect(output).toContain("No crawler state recorded.");
});

test("formatRunReport renders tabular session and crawler rows", () => {
  const report: RunReport = {
    databasePath: "/tmp/praytime.sqlite",
    generatedAt: "2026-03-06T10:00:00.000Z",
    latestSession: {
      id: 42,
      startedAt: "2026-03-06T00:00:00.000Z",
      finishedAt: "2026-03-06T00:01:00.000Z",
      status: "completed",
      crawlerCount: 2,
      errorCount: 0,
      staticCount: 1,
      noChangeCount: 1,
      timingsUpdatedCount: 0,
      gitCommitHash: "abc123",
      gitDirty: false,
    },
    recentSessions: [
      {
        id: 42,
        startedAt: "2026-03-06T00:00:00.000Z",
        finishedAt: "2026-03-06T00:01:00.000Z",
        status: "completed",
        crawlerCount: 2,
        errorCount: 0,
        staticCount: 1,
        noChangeCount: 1,
        timingsUpdatedCount: 0,
        gitCommitHash: "abc123",
        gitDirty: false,
      },
    ],
    crawlers: [
      {
        crawlerName: "US/IL/example",
        sourcePath: "src/crawlers/US/IL/example.ts",
        isStatic: false,
        isPuppeteer: false,
        lastRunAt: "2026-03-06T00:01:00.000Z",
        lastStatus: "no_change",
        lastError: "save diff: Juma2 is deleted",
        consecutiveErrors: 0,
        lastDurationMs: 900,
        lastRecordCount: 1,
        lastUpdatedCount: 0,
        lastNoChangeCount: 1,
        lastFirstSeenCount: 0,
        lastSkippedReason: null,
        lastGitCommitHash: "abc123",
        lastGitDirty: false,
      },
    ],
  };

  const output = formatRunReport(report);

  expect(output).toContain("+");
  expect(output).toContain("| ID ");
  expect(output).toContain("Recent Sessions");
  expect(output).toContain("Crawler State");
  expect(output).toContain("US/IL/example");
  expect(output).toContain("save diff: Juma2 is deleted");
  expect(output).toContain("no_change");
  expect(output).toContain("abc123");
});
