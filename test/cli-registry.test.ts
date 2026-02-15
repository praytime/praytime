import { expect, test } from "bun:test";

import { parseCliArgs } from "../src/index";
import { filterCrawlerEntries } from "../src/registry";
import type { CrawlerRegistryEntry } from "../src/types";

const sampleId = {
  uuid4: "00000000-0000-0000-0000-000000000000",
  name: "Sample Masjid",
  url: "https://example.com",
  timeZoneId: "America/New_York",
  geo: {
    latitude: 0,
    longitude: 0,
  },
};

const entries: CrawlerRegistryEntry[] = [
  {
    name: "US/GA/al-farooq-masjid-atlanta",
    sourcePath: "src/crawlers/US/GA/al-farooq-masjid-atlanta.ts",
    crawler: {
      name: "US/GA/al-farooq-masjid-atlanta",
      ids: [sampleId],
    },
  },
  {
    name: "US/GA/hamzah-islamic-center-alpharetta",
    sourcePath: "src/crawlers/US/GA/hamzah-islamic-center-alpharetta.ts",
    crawler: {
      name: "US/GA/hamzah-islamic-center-alpharetta",
      ids: [sampleId],
      puppeteer: true,
    },
  },
  {
    name: "US/IL/batavia-islamic-center",
    sourcePath: "src/crawlers/US/IL/batavia-islamic-center.ts",
    crawler: {
      name: "US/IL/batavia-islamic-center",
      ids: [sampleId],
    },
  },
];

test("parseCliArgs accepts repeated --crawler and positional patterns", () => {
  const parsed = parseCliArgs([
    "--skip-ppt",
    "--crawler",
    "US/GA/*",
    "US/IL/batavia-islamic-center",
  ]);

  expect(parsed.skipPuppeteer).toBeTrue();
  expect(parsed.patterns).toEqual(["US/GA/*", "US/IL/batavia-islamic-center"]);
});

test("filterCrawlerEntries matches glob patterns", () => {
  const filtered = filterCrawlerEntries(entries, ["US/GA/*"]);
  expect(filtered.map((entry) => entry.name)).toEqual([
    "US/GA/al-farooq-masjid-atlanta",
    "US/GA/hamzah-islamic-center-alpharetta",
  ]);
});

test("filterCrawlerEntries throws on unmatched patterns", () => {
  expect(() => filterCrawlerEntries(entries, ["US/XX/*"])).toThrow(
    /no crawlers matched pattern/,
  );
});
