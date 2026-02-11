import { expect, test } from "bun:test";

import { discoverCrawlers } from "../src/registry";

test("all crawler ids use unique uuid4 values", async () => {
  const entries = await discoverCrawlers();
  const seen = new Map<string, string[]>();

  for (const entry of entries) {
    for (const record of entry.crawler.ids) {
      const uuid = record.uuid4;
      const label = `${entry.name} -> ${typeof record.name === "string" && record.name ? record.name : "unknown"}`;

      expect(typeof uuid).toBe("string");
      expect(uuid.length > 0).toBeTrue();

      const existing = seen.get(uuid);
      if (existing) {
        existing.push(label);
      } else {
        seen.set(uuid, [label]);
      }
    }
  }

  const duplicates = [...seen.entries()].filter(([, refs]) => refs.length > 1);

  expect(duplicates).toEqual([]);
});
