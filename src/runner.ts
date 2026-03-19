import { geohashForLocation } from "geofire-common";
import type {
  CrawlerModule,
  CrawlerSkipReason,
  CrawlOutputLine,
  DumpRecord,
  MasjidRecord,
  RunnerOptions,
} from "./types";
import * as util from "./util";
import { validateCrawlRecord } from "./validation";

const stringifyError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.toString();
  }
  return String(error);
};

const withTimeout = async <T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string,
): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

const enrichRecord = (
  record: MasjidRecord,
  isStatic: boolean,
): MasjidRecord => {
  const { latitude, longitude } = record.geo;

  record.crawlTime ??= new Date();
  record.geohash = geohashForLocation([latitude, longitude]);
  record.isStatic = isStatic;

  return record;
};

const appendError = (existing: string, next: string): string => {
  const current = existing.trim();
  const incoming = next.trim();

  if (incoming.length === 0) {
    return current;
  }
  if (current.length === 0) {
    return incoming;
  }
  if (current.includes(incoming)) {
    return current;
  }

  return `${current} | ${incoming}`;
};

const logValidationIssues = (
  source: string,
  record: MasjidRecord,
  level: "error" | "warning",
  issues: string[],
): void => {
  if (issues.length === 0) {
    return;
  }

  const uuidPrefix =
    typeof record.uuid4 === "string" ? record.uuid4.slice(0, 8) : "unknown";
  for (const issue of issues) {
    console.error("%s[%s] validation %s: %s", source, uuidPrefix, level, issue);
  }
};

export const dumpCrawlerMetadata = (crawlers: CrawlerModule[]): DumpRecord[] =>
  crawlers.flatMap((crawler) =>
    crawler.ids.map((id) => {
      const { latitude, longitude } = id.geo;
      return {
        name: id.name,
        url: id.url,
        geo: [latitude, longitude] as [number, number],
        geohash: geohashForLocation([latitude, longitude]),
      };
    }),
  );

export const runCrawlers = async (
  crawlers: CrawlerModule[],
  options: RunnerOptions = {},
): Promise<void> => {
  const crawlerTimeoutMs = util.parsePositiveInt(
    options.crawlerTimeoutMs ?? process.env.CRAWLER_TIMEOUT_MS,
    45_000,
  );

  const puppeteerDisabled = "PUPPETEER_DISABLED" in process.env;
  const skipPuppeteer = options.skipPuppeteer === true;
  const skipStatic = options.skipStatic === true;
  const emitJson = options.emitJson !== false;
  const onOutput = options.onOutput;
  const onCrawlerComplete = options.onCrawlerComplete;

  for (const crawler of util.shuffle([...crawlers])) {
    const startedAt = new Date();
    const crawlResults = crawler.ids;
    let crawlError = "";
    let skippedReason: CrawlerSkipReason | undefined;
    let runInvoked = false;
    let emittedCount = 0;

    try {
      let shouldEmitResults = true;

      if (crawler.run) {
        if ((puppeteerDisabled || skipPuppeteer) && crawler.puppeteer) {
          console.error("skipping puppeteer crawler: %s", crawler.name);
          skippedReason = skipPuppeteer
            ? "cli-skip-puppeteer"
            : "env-puppeteer-disabled";
          shouldEmitResults = false;
        } else {
          runInvoked = true;
          try {
            const maybeUpdatedRecords = await withTimeout(
              Promise.resolve(crawler.run()),
              crawlerTimeoutMs,
              `crawler timed out after ${crawlerTimeoutMs}ms`,
            );

            if (Array.isArray(maybeUpdatedRecords)) {
              crawlResults.splice(
                0,
                crawlResults.length,
                ...maybeUpdatedRecords,
              );
            }
          } catch (error: unknown) {
            crawlError = stringifyError(error);
          }
        }
      } else if (skipStatic) {
        console.error("skipping static crawler: %s", crawler.name);
        skippedReason = "cli-skip-static";
        shouldEmitResults = false;
      }

      if (shouldEmitResults) {
        for (const result of crawlResults) {
          const enrichedResult = enrichRecord(result, !crawler.run);
          const output: CrawlOutputLine = {
            crawlError,
            result: enrichedResult,
            error: crawlError,
            source: crawler.name,
          };

          if (output.error.length === 0) {
            const validation = validateCrawlRecord(enrichedResult);
            output.validationWarnings = validation.warnings;

            logValidationIssues(
              crawler.name,
              enrichedResult,
              "warning",
              validation.warnings,
            );

            if (validation.errors.length > 0) {
              output.validationErrors = validation.errors;
              logValidationIssues(
                crawler.name,
                enrichedResult,
                "error",
                validation.errors,
              );
              output.error = appendError(
                output.error,
                `validation: ${validation.errors.join("; ")}`,
              );
            }
          }

          if (onOutput) {
            try {
              await onOutput(output);
            } catch (error: unknown) {
              console.error(
                "output handler failed for %s:",
                crawler.name,
                error,
              );
            }
          }

          if (emitJson) {
            console.log("%j", output);
          }

          emittedCount += 1;
        }
      }
    } catch (error: unknown) {
      if (crawlError.length === 0) {
        crawlError = stringifyError(error);
      }
      console.error("caught error processing %s:", crawler.name, error);
    } finally {
      if (onCrawlerComplete) {
        const finishedAt = new Date();
        try {
          await onCrawlerComplete({
            name: crawler.name,
            isStatic: !crawler.run,
            isPuppeteer: crawler.puppeteer === true,
            runInvoked,
            skippedReason,
            error: crawlError,
            startedAt,
            finishedAt,
            durationMs: finishedAt.getTime() - startedAt.getTime(),
            emittedCount,
            crawlerTimeoutMs,
          });
        } catch (error: unknown) {
          console.error(
            "crawler completion handler failed for %s:",
            crawler.name,
            error,
          );
        }
      }
    }
  }
};
