import puppeteer, { type GoToOptions, type Page } from "puppeteer";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

export const createPuppeteerRun = (
  ids: CrawlerIds,
  loadPage: (page: Page) => Promise<void>,
): CrawlerRun => {
  return async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      await loadPage(page);
      return ids;
    } finally {
      await browser.close();
    }
  };
};

export const loadFrameAfterGoto = async (
  page: Page,
  url: string,
  frameUrlFragment: string,
  gotoOptions?: GoToOptions,
) => {
  const [frame] = await Promise.all([
    util.waitForFrame(page, frameUrlFragment),
    page.goto(url, { waitUntil: "networkidle0", ...gotoOptions }),
  ]);

  return frame;
};

const firstMosquePrayerTimesClock = (text: string): string => {
  const value = text.match(/\d{1,2}:\d{2}/)?.[0] ?? "";
  return util.normalizeLooseClock(value);
};

export const loadMosquePrayerTimesTable = async (
  page: Page,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const rows = await page.$$eval(".timetable-verticle tr", (tableRows) =>
    tableRows.map((row) =>
      Array.from(
        (
          row as { querySelectorAll(selector: string): unknown[] }
        ).querySelectorAll("td, th"),
      ).map(
        (cell) =>
          (cell as { textContent: string | null }).textContent
            ?.replace(/\s+/g, " ")
            .trim() ?? "",
      ),
    ),
  );
  if (rows.length === 0) {
    throw new Error("missing mosqueprayertimes timetable rows");
  }

  const prayerTimes = new Map<string, string>();
  let jumaTimes: string[] = [];
  for (const cells of rows) {
    const label = (cells[0] ?? "").replace(/\s+/g, " ").trim();
    const prayerKey = util.getStandardPrayerKey(label);
    if (prayerKey) {
      const iqamaTime = firstMosquePrayerTimesClock(cells[2] ?? "");
      if (iqamaTime) {
        prayerTimes.set(prayerKey, iqamaTime);
      }
      continue;
    }

    if (/jum['’]?ah/i.test(label)) {
      const jumaTime = firstMosquePrayerTimesClock(cells[1] ?? cells[2] ?? "");
      if (jumaTime) {
        jumaTimes = [jumaTime];
      }
    }
  }

  if (!prayerTimes.get("zuhr") && jumaTimes[0]) {
    prayerTimes.set("zuhr", jumaTimes[0]);
  }

  return {
    iqamaTimes: util.requireStandardPrayerTimes(
      prayerTimes,
      "failed to parse mosqueprayertimes iqama times",
    ),
    jumaTimes,
  };
};

export const createMosquePrayerTimesRun = (ids: CrawlerIds): CrawlerRun => {
  return createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle0" });

    const { iqamaTimes, jumaTimes } = await loadMosquePrayerTimesTable(page);
    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes);
  });
};
