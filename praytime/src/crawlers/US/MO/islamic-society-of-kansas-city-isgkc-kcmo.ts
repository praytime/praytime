// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "8094257d-2b5a-4857-88ba-7ddc96d1d084",
    name: "Islamic Society of Kansas City (ISGKC)",
    url: "http://www.isgkc.org/",
    timeZoneId: "America/Chicago",
    address: "8501 E 99 St, Kansas City, MO 64134, USA",
    placeId: "ChIJn8jbd9jmwIcRUr9dus81CkM",
    geo: {
      latitude: 38.943845,
      longitude: -94.4911243,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(
      "https://masjidbox.com/prayer-times/islamic-society-of-greater-kansas-city",
    );

    await page.waitForSelector("div.iqamah div.time");

    const t = await page.$$eval("div.iqamah div.time", (divs) =>
      divs.map((div) => {
        const p = div.textContent.trim().match(/(\d{1,2})(\d{2}\w+)/);
        // convert 630AM => 6:30AM
        return `${p[1]}:${p[2]}`;
      }),
    );
    util.setIqamaTimes(ids[0], t);

    const j = await page.$$eval("div.jumuah-times div.athan-time", (divs) =>
      divs.map((div) => {
        const p = div.textContent.trim().match(/(\d{1,2})(\d{2}\w+)/);
        // convert 630AM => 6:30AM
        return `${p[1]}:${p[2]}`;
      }),
    );
    util.setJumaTimes(ids[0], j);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MO/islamic-society-of-kansas-city-isgkc-kcmo",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
