import puppeteer, { type Page } from "puppeteer";
import type { CrawlerIds, CrawlerRun } from "./types";

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
