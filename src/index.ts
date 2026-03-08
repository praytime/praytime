import { CrawlStateStore, getGitMetadata } from "./localdb";
import {
  discoverCrawlers,
  filterCrawlerEntries,
  listCrawlerNames,
} from "./registry";
import { formatRunReport } from "./report";
import { dumpCrawlerMetadata, runCrawlers } from "./runner";
import { PraytimeSaver } from "./save";
import type { CliOptions } from "./types";

const usage = `Usage: bun run index.ts [options] [crawler-name-or-glob ...]

Options:
  --crawler <name-or-glob>  Select crawler(s), repeatable
  --list                    List crawler names and exit
  --dump                    Dump static crawler metadata and exit
  --run-report              Print local SQLite crawler run report table and exit
  --save                    Save crawler output to Firestore and send FCM changes
  --force                   Ignore deletions and force save (requires --save)
  --verbose                 Verbose save logging (requires --save)
  --skip-static             Skip static crawlers (no run function)
  --skip-ppt                Skip puppeteer crawlers entirely
  --help                    Show this help message
`;

const writeStdout = async (value: string): Promise<void> => {
  await new Promise<void>((resolve, reject) => {
    process.stdout.write(value, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
};

export const parseCliArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = {
    dump: false,
    list: false,
    help: false,
    runReport: false,
    save: false,
    force: false,
    verbose: false,
    skipStatic: false,
    skipPuppeteer: false,
    patterns: [],
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg) {
      continue;
    }

    if (arg === "--") {
      options.patterns.push(...argv.slice(i + 1));
      break;
    }

    if (!arg.startsWith("--")) {
      options.patterns.push(arg);
      continue;
    }

    if (arg === "--dump") {
      options.dump = true;
      continue;
    }

    if (arg === "--list") {
      options.list = true;
      continue;
    }

    if (arg === "--save") {
      options.save = true;
      continue;
    }

    if (arg === "--run-report") {
      options.runReport = true;
      continue;
    }

    if (arg === "--force") {
      options.force = true;
      continue;
    }

    if (arg === "--verbose") {
      options.verbose = true;
      continue;
    }

    if (arg === "--skip-static") {
      options.skipStatic = true;
      continue;
    }

    if (arg === "--skip-ppt") {
      options.skipPuppeteer = true;
      continue;
    }

    if (arg === "--help") {
      options.help = true;
      continue;
    }

    if (arg === "--crawler") {
      const pattern = argv[i + 1];
      if (!pattern) {
        throw new Error("--crawler requires a value");
      }
      options.patterns.push(pattern);
      i += 1;
      continue;
    }

    if (arg.startsWith("--crawler=")) {
      const pattern = arg.slice("--crawler=".length);
      if (!pattern) {
        throw new Error("--crawler requires a non-empty value");
      }
      options.patterns.push(pattern);
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!options.help) {
    if (options.save && options.dump) {
      throw new Error("--save cannot be used with --dump");
    }

    if (options.save && options.list) {
      throw new Error("--save cannot be used with --list");
    }

    if (options.runReport && options.dump) {
      throw new Error("--run-report cannot be used with --dump");
    }

    if (options.runReport && options.list) {
      throw new Error("--run-report cannot be used with --list");
    }

    if (options.runReport && options.save) {
      throw new Error("--run-report cannot be used with --save");
    }

    if (!options.save && options.force) {
      throw new Error("--force requires --save");
    }

    if (!options.save && options.verbose) {
      throw new Error("--verbose requires --save");
    }

    if (options.runReport && options.patterns.length > 0) {
      throw new Error("--run-report does not accept crawler patterns");
    }

    if (options.runReport && options.skipStatic) {
      throw new Error("--run-report cannot be used with --skip-static");
    }

    if (options.runReport && options.skipPuppeteer) {
      throw new Error("--run-report cannot be used with --skip-ppt");
    }
  }

  return options;
};

export const main = async (argv = process.argv.slice(2)): Promise<void> => {
  const options = parseCliArgs(argv);

  if (options.help) {
    await writeStdout(usage);
    return;
  }

  if (options.runReport) {
    const store = new CrawlStateStore();
    try {
      await writeStdout(`${formatRunReport(store.getRunReport())}\n`);
    } finally {
      store.close();
    }
    return;
  }

  const allEntries = await discoverCrawlers();
  const selectedEntries = filterCrawlerEntries(allEntries, options.patterns);

  if (options.list) {
    for (const name of listCrawlerNames(selectedEntries)) {
      console.log(name);
    }
    return;
  }

  const selectedCrawlers = selectedEntries.map((entry) => entry.crawler);

  if (options.dump) {
    await writeStdout(
      `${JSON.stringify(dumpCrawlerMetadata(selectedCrawlers))}\n`,
    );
    return;
  }

  const store = new CrawlStateStore();
  const git = getGitMetadata(process.cwd());
  const descriptors = selectedEntries.map((entry) => ({
    name: entry.crawler.name,
    sourcePath: entry.sourcePath,
    isStatic: !entry.crawler.run,
    isPuppeteer: entry.crawler.puppeteer === true,
  }));
  const saver = options.save
    ? new PraytimeSaver({
        force: options.force,
        verbose: options.verbose,
      })
    : null;
  let runErrorMessage: string | undefined;
  let hasStartedRunSession = false;

  try {
    store.registerCrawlerDescriptors(descriptors);
    store.startRunSession({
      argv,
      patterns: options.patterns,
      crawlerNames: descriptors.map((descriptor) => descriptor.name),
      options: {
        save: options.save,
        force: options.force,
        verbose: options.verbose,
        skipStatic: options.skipStatic,
        skipPuppeteer: options.skipPuppeteer,
      },
      git,
    });
    hasStartedRunSession = true;

    await runCrawlers(selectedCrawlers, {
      skipStatic: options.skipStatic,
      skipPuppeteer: options.skipPuppeteer,
      emitJson: !options.save,
      onOutput: async (line) => {
        store.recordCrawlerOutput(line);
        if (saver) {
          const saveResult = await saver.saveLine(line);
          if (saveResult.outcome === "error") {
            store.recordCrawlerSaveError(line.source, saveResult.error);
          }
        }
      },
      onCrawlerComplete: (event) => {
        store.recordCrawlerCompletion(event);
      },
    });
  } catch (error: unknown) {
    runErrorMessage = error instanceof Error ? error.message : String(error);
    throw error;
  } finally {
    if (hasStartedRunSession) {
      try {
        store.finishRunSession({
          fatalError: runErrorMessage,
        });
      } catch (error: unknown) {
        console.error("failed to finalize local crawler session:", error);
      }
    }

    try {
      store.close();
    } catch (error: unknown) {
      console.error("failed to close local crawler db:", error);
    }

    if (saver) {
      await saver.close();
    }
  }
};

if (import.meta.main) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
  });
}
