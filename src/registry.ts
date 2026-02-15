import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import type {
  CrawlerIds,
  CrawlerModule,
  CrawlerRegistryEntry,
  CrawlerRun,
} from "./types";

const srcDir = path.dirname(fileURLToPath(import.meta.url));
const crawlersDir = path.join(srcDir, "crawlers");

const toPosixPath = (value: string): string => value.replace(/\\/g, "/");

const hasGlobSyntax = (pattern: string): boolean => /[*?[\]{}!]/.test(pattern);

const canonicalNameFromRelativePath = (relativePath: string): string => {
  const withoutExt = toPosixPath(relativePath).replace(/\.ts$/, "");
  if (withoutExt.endsWith("/index")) {
    return withoutExt.slice(0, -"/index".length);
  }
  return withoutExt;
};

const normalizeCrawlerCandidate = (
  candidate: unknown,
  inferredName: string,
): CrawlerModule | null => {
  if (!candidate || typeof candidate !== "object") {
    return null;
  }

  const raw = candidate as {
    name?: unknown;
    ids?: unknown;
    run?: unknown;
    puppeteer?: unknown;
  };

  if (!Array.isArray(raw.ids) || raw.ids.length === 0) {
    return null;
  }

  const run =
    typeof raw.run === "function" ? (raw.run as CrawlerRun) : undefined;
  const name =
    typeof raw.name === "string" && raw.name.length > 0
      ? raw.name
      : inferredName;

  return {
    name,
    ids: raw.ids as CrawlerIds,
    run,
    puppeteer: raw.puppeteer === true,
  };
};

const normalizeCrawlerModule = (
  namespace: unknown,
  inferredName: string,
): CrawlerModule => {
  const rawNamespace = namespace as {
    crawler?: unknown;
    default?: unknown;
    name?: unknown;
    ids?: unknown;
    run?: unknown;
    puppeteer?: unknown;
  };

  const candidates: unknown[] = [
    rawNamespace.crawler,
    rawNamespace.default,
    {
      name: rawNamespace.name,
      ids: rawNamespace.ids,
      run: rawNamespace.run,
      puppeteer: rawNamespace.puppeteer,
    },
  ];

  for (const candidate of candidates) {
    const crawler = normalizeCrawlerCandidate(candidate, inferredName);
    if (crawler) {
      return crawler;
    }
  }

  throw new Error(`crawler module is missing an ids array: ${inferredName}`);
};

export const discoverCrawlers = async (): Promise<CrawlerRegistryEntry[]> => {
  const glob = new Bun.Glob("**/*.ts");
  const entries: CrawlerRegistryEntry[] = [];

  for await (const relativePath of glob.scan({ cwd: crawlersDir })) {
    if (relativePath.endsWith(".d.ts")) {
      continue;
    }

    const canonicalName = canonicalNameFromRelativePath(relativePath);
    const absolutePath = path.join(crawlersDir, relativePath);
    const sourcePath = toPosixPath(path.join("src", "crawlers", relativePath));
    const moduleUrl = pathToFileURL(absolutePath).href;
    const namespace = await import(moduleUrl);
    const crawler = normalizeCrawlerModule(namespace, canonicalName);

    entries.push({
      name: crawler.name,
      sourcePath,
      crawler,
    });
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));
  return entries;
};

export const filterCrawlerEntries = (
  entries: CrawlerRegistryEntry[],
  patterns: string[],
): CrawlerRegistryEntry[] => {
  if (patterns.length === 0) {
    return entries;
  }

  const selected = new Map<string, CrawlerRegistryEntry>();

  for (const rawPattern of patterns) {
    const pattern = toPosixPath(rawPattern);
    const matcher = new Bun.Glob(pattern);
    let matched = 0;

    for (const entry of entries) {
      const isExactMatch = !hasGlobSyntax(pattern) && entry.name === pattern;
      if (isExactMatch || matcher.match(entry.name)) {
        selected.set(entry.name, entry);
        matched += 1;
      }
    }

    if (matched === 0) {
      throw new Error(`no crawlers matched pattern: ${rawPattern}`);
    }
  }

  return [...selected.values()].sort((a, b) => a.name.localeCompare(b.name));
};

export const listCrawlerNames = (entries: CrawlerRegistryEntry[]): string[] =>
  entries.map((entry) => entry.name);
