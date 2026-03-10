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
