import {
  discoverCrawlers,
  filterCrawlerEntries,
  listCrawlerNames,
} from "./registry";
import { dumpCrawlerMetadata, runCrawlers } from "./runner";
import type { CliOptions } from "./types";

const usage = `Usage: bun run index.ts [options] [crawler-name-or-glob ...]

Options:
  --crawler <name-or-glob>  Select crawler(s), repeatable
  --list                    List crawler names and exit
  --dump                    Dump static crawler metadata and exit
  --skip-static             Skip static crawlers (no run function)
  --skip-ppt                Skip puppeteer crawlers entirely
  --help                    Show this help message
`;

export const parseCliArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = {
    dump: false,
    list: false,
    help: false,
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

  return options;
};

export const main = async (argv = process.argv.slice(2)): Promise<void> => {
  const options = parseCliArgs(argv);

  if (options.help) {
    console.log(usage);
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
    console.log("%j", dumpCrawlerMetadata(selectedCrawlers));
    return;
  }

  await runCrawlers(selectedCrawlers, {
    skipStatic: options.skipStatic,
    skipPuppeteer: options.skipPuppeteer,
  });
};

if (import.meta.main) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exit(1);
  });
}
