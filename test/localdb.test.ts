import { expect, test } from "bun:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { type CrawlerRunStatus, CrawlStateStore } from "../src/localdb";
import type { CrawlerRunCompleteEvent, MasjidRecord } from "../src/types";

const baseRecord = (
  uuid4: string,
  overrides: Partial<MasjidRecord> = {},
): MasjidRecord => ({
  uuid4,
  name: "Sample Masjid",
  url: "https://example.com",
  timeZoneId: "America/Chicago",
  geo: {
    latitude: 41.88,
    longitude: -87.62,
  },
  ...overrides,
});

const completeEvent = (
  name: string,
  overrides: Partial<CrawlerRunCompleteEvent> = {},
): CrawlerRunCompleteEvent => ({
  name,
  isStatic: false,
  isPuppeteer: false,
  runInvoked: true,
  error: "",
  startedAt: new Date("2025-01-01T00:00:00.000Z"),
  finishedAt: new Date("2025-01-01T00:00:01.000Z"),
  durationMs: 1000,
  emittedCount: 1,
  crawlerTimeoutMs: 45_000,
  ...overrides,
});

const startSession = (store: CrawlStateStore, crawlerNames: string[]): void => {
  store.startRunSession({
    argv: ["US/IL/test"],
    patterns: ["US/IL/test"],
    crawlerNames,
    options: {
      save: false,
      force: false,
      verbose: false,
      skipStatic: false,
      skipPuppeteer: false,
    },
    git: {
      commitHash: "abc123",
      dirty: false,
    },
    startedAt: new Date("2025-01-01T00:00:00.000Z"),
  });
};

const recordSuccessfulRun = (
  store: CrawlStateStore,
  name: string,
  uuid4: string,
  fajrIqama: string,
): CrawlerRunStatus => {
  startSession(store, [name]);
  store.recordCrawlerOutput({
    source: name,
    error: "",
    result: baseRecord(uuid4, {
      fajrIqama,
    }),
  });
  const status = store.recordCrawlerCompletion(completeEvent(name));
  store.finishRunSession();
  return status;
};

const withStore = (callback: (store: CrawlStateStore) => void): void => {
  const tempDir = mkdtempSync(path.join(tmpdir(), "praytime-localdb-"));
  const dbPath = path.join(tempDir, "crawler-state.sqlite");
  const store = new CrawlStateStore(dbPath);

  try {
    callback(store);
  } finally {
    store.close();
    rmSync(tempDir, { recursive: true, force: true });
  }
};

test("CrawlStateStore classifies timings_updated and no_change transitions", () => {
  withStore((store) => {
    store.registerCrawlerDescriptors([
      {
        name: "US/IL/dynamic",
        sourcePath: "src/crawlers/US/IL/dynamic.ts",
        isStatic: false,
        isPuppeteer: false,
      },
    ]);

    const statuses: CrawlerRunStatus[] = [];

    statuses.push(
      recordSuccessfulRun(
        store,
        "US/IL/dynamic",
        "11111111-1111-4111-8111-111111111111",
        "5:00a",
      ),
    );
    statuses.push(
      recordSuccessfulRun(
        store,
        "US/IL/dynamic",
        "11111111-1111-4111-8111-111111111111",
        "5:00a",
      ),
    );
    statuses.push(
      recordSuccessfulRun(
        store,
        "US/IL/dynamic",
        "11111111-1111-4111-8111-111111111111",
        "5:10a",
      ),
    );

    expect(statuses).toEqual([
      "timings_updated",
      "no_change",
      "timings_updated",
    ]);

    const report = store.getRunReport({ crawlerLimit: 10, sessionLimit: 10 });
    const dynamic = report.crawlers.find(
      (crawler) => crawler.crawlerName === "US/IL/dynamic",
    );

    expect(dynamic).toBeDefined();
    expect(dynamic?.lastStatus).toBe("timings_updated");
    expect(dynamic?.lastUpdatedCount).toBe(1);
    expect(report.recentSessions).toHaveLength(3);
    expect(report.latestSession?.status).toBe("completed");
  });
});

test("CrawlStateStore classifies static and error crawlers and increments consecutive errors", () => {
  withStore((store) => {
    store.registerCrawlerDescriptors([
      {
        name: "US/IL/static",
        sourcePath: "src/crawlers/US/IL/static.ts",
        isStatic: true,
        isPuppeteer: false,
      },
      {
        name: "US/IL/error",
        sourcePath: "src/crawlers/US/IL/error.ts",
        isStatic: false,
        isPuppeteer: false,
      },
    ]);

    startSession(store, ["US/IL/static", "US/IL/error"]);
    const staticStatus = store.recordCrawlerCompletion(
      completeEvent("US/IL/static", {
        isStatic: true,
        runInvoked: false,
        emittedCount: 0,
        skippedReason: "cli-skip-static",
      }),
    );
    store.recordCrawlerOutput({
      source: "US/IL/error",
      error: "crawler timed out",
      result: baseRecord("22222222-2222-4222-8222-222222222222"),
    });
    const errorStatus1 = store.recordCrawlerCompletion(
      completeEvent("US/IL/error", { runInvoked: true }),
    );
    store.finishRunSession();

    startSession(store, ["US/IL/error"]);
    store.recordCrawlerOutput({
      source: "US/IL/error",
      error: "crawler timed out",
      result: baseRecord("22222222-2222-4222-8222-222222222222"),
    });
    const errorStatus2 = store.recordCrawlerCompletion(
      completeEvent("US/IL/error", { runInvoked: true }),
    );
    store.finishRunSession();

    expect(staticStatus).toBe("static");
    expect(errorStatus1).toBe("error");
    expect(errorStatus2).toBe("error");

    const report = store.getRunReport({ crawlerLimit: 10, sessionLimit: 10 });
    const errorCrawler = report.crawlers.find(
      (crawler) => crawler.crawlerName === "US/IL/error",
    );
    const staticCrawler = report.crawlers.find(
      (crawler) => crawler.crawlerName === "US/IL/static",
    );

    expect(errorCrawler).toBeDefined();
    expect(errorCrawler?.lastStatus).toBe("error");
    expect(errorCrawler?.consecutiveErrors).toBe(2);
    expect(staticCrawler?.lastStatus).toBe("static");
    expect(report.latestSession?.status).toBe("completed_with_errors");
  });
});

test("CrawlStateStore does not count intentionally skipped puppeteer crawlers as errors", () => {
  withStore((store) => {
    store.registerCrawlerDescriptors([
      {
        name: "US/IL/puppeteer",
        sourcePath: "src/crawlers/US/IL/puppeteer.ts",
        isStatic: false,
        isPuppeteer: true,
      },
    ]);

    startSession(store, ["US/IL/puppeteer"]);
    store.recordCrawlerOutput({
      source: "US/IL/puppeteer",
      error: "crawler timed out",
      result: baseRecord("33333333-3333-4333-8333-333333333333"),
    });
    const errorStatus = store.recordCrawlerCompletion(
      completeEvent("US/IL/puppeteer", {
        isPuppeteer: true,
      }),
    );
    store.finishRunSession();

    startSession(store, ["US/IL/puppeteer"]);
    const skippedStatus = store.recordCrawlerCompletion(
      completeEvent("US/IL/puppeteer", {
        isPuppeteer: true,
        runInvoked: false,
        emittedCount: 0,
        skippedReason: "env-puppeteer-disabled",
      }),
    );
    store.finishRunSession();

    expect(errorStatus).toBe("error");
    expect(skippedStatus).toBe("no_change");

    const report = store.getRunReport({ crawlerLimit: 10, sessionLimit: 10 });
    const crawler = report.crawlers.find(
      (entry) => entry.crawlerName === "US/IL/puppeteer",
    );

    expect(crawler).toBeDefined();
    expect(crawler?.lastStatus).toBe("no_change");
    expect(crawler?.consecutiveErrors).toBe(0);
    expect(crawler?.lastSkippedReason).toBe("env-puppeteer-disabled");
    expect(report.latestSession?.status).toBe("completed");
  });
});

test("CrawlStateStore records save-layer failures as crawler errors", () => {
  withStore((store) => {
    store.registerCrawlerDescriptors([
      {
        name: "US/IL/save-error",
        sourcePath: "src/crawlers/US/IL/save-error.ts",
        isStatic: false,
        isPuppeteer: false,
      },
    ]);

    startSession(store, ["US/IL/save-error"]);
    store.recordCrawlerOutput({
      source: "US/IL/save-error",
      error: "",
      result: baseRecord("44444444-4444-4444-8444-444444444444", {
        juma1: "1:00p",
      }),
    });
    store.recordCrawlerSaveError(
      "US/IL/save-error",
      "save diff: Juma2 is deleted",
    );
    const status = store.recordCrawlerCompletion(
      completeEvent("US/IL/save-error"),
    );
    store.finishRunSession();

    expect(status).toBe("error");

    const report = store.getRunReport({ crawlerLimit: 10, sessionLimit: 10 });
    const crawler = report.crawlers.find(
      (entry) => entry.crawlerName === "US/IL/save-error",
    );

    expect(crawler).toBeDefined();
    expect(crawler?.lastStatus).toBe("error");
    expect(crawler?.lastError).toContain("save diff: Juma2 is deleted");
    expect(report.latestSession?.status).toBe("completed_with_errors");
  });
});
