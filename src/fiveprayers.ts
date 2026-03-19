import puppeteer from "puppeteer";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const normalizeClock = (value: string): string =>
  util.extractTimeAmPm(value) || util.extractTime(value);

export const createFivePrayersRun = (
  ids: CrawlerIds,
  displayId: string,
): CrawlerRun => {
  return async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await page.goto(
        `http://fiveprayers.org/display/index.php?id=${encodeURIComponent(displayId)}`,
        { waitUntil: "networkidle0" },
      );

      const [iqamaTimesRaw, jumaTimesRaw] = await Promise.all([
        page.$$eval("td[id$=Iq]", (nodes) =>
          nodes.map((node) => node.textContent?.trim() ?? ""),
        ),
        page.$$eval("td#fdp", (nodes) =>
          nodes.map((node) => node.textContent?.trim() ?? ""),
        ),
      ]);

      const iqamaTimes = iqamaTimesRaw
        .map(normalizeClock)
        .filter((value) => value.length > 0);
      if (iqamaTimes.length < 5) {
        throw new Error(`incomplete fiveprayers iqama times for ${displayId}`);
      }

      const jumaTimes = jumaTimesRaw
        .map(normalizeClock)
        .filter((value) => value.length > 0);
      if (jumaTimes.length === 0) {
        throw new Error(`missing fiveprayers Juma times for ${displayId}`);
      }

      util.setIqamaTimes(ids[0], iqamaTimes.slice(0, 5));
      util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

      return ids;
    } finally {
      await browser.close();
    }
  };
};
