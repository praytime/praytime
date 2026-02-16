import {
  discoverCrawlers,
  filterCrawlerEntries,
  listCrawlerNames,
} from "./registry";
import { dumpCrawlerMetadata, runCrawlers } from "./runner";
import { PraytimeSaver } from "./save";
import type { CliOptions } from "./types";

const usage = `Usage: bun run index.ts [options] [crawler-name-or-glob ...]

Options:
  --crawler <name-or-glob>  Select crawler(s), repeatable
  --list                    List crawler names and exit
  --dump                    Dump static crawler metadata and exit
  --save                    Save crawler output to Firestore and send FCM changes
  --force                   Ignore deletions and force save (requires --save)
  --verbose                 Verbose save logging (requires --save)
  --skip-static             Skip static crawlers (no run function)
  --skip-ppt                Skip puppeteer crawlers entirely
  --help                    Show this help message
`;

export const parseCliArgs = (argv: string[]): CliOptions => {
  const options: CliOptions = {
    dump: false,
    list: false,
    help: false,
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

    if (!options.save && options.force) {
      throw new Error("--force requires --save");
    }

    if (!options.save && options.verbose) {
      throw new Error("--verbose requires --save");
    }
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

  if (options.save) {
    const saver = new PraytimeSaver({
      force: options.force,
      verbose: options.verbose,
    });

    try {
      await runCrawlers(selectedCrawlers, {
        skipStatic: options.skipStatic,
        skipPuppeteer: options.skipPuppeteer,
        emitJson: false,
        onOutput: (line) => saver.saveLine(line),
      });
    } finally {
      await saver.close();
    }

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
