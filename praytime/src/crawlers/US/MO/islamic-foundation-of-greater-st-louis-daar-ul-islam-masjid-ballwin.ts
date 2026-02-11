// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "24e23e22-5290-48df-adf6-3aa3adc165d3",
    name: "Islamic Foundation of Greater St. Louis (Daar Ul-Islam Masjid)",
    url: "http://islamstl.org/",
    timeZoneId: "America/Chicago",
    address: "517 Weidman Rd, Ballwin, MO 63011, USA",
    placeId: "ChIJtyXiEK_T2IcRwJ_B3WzW0xY",
    geo: {
      latitude: 38.6031468,
      longitude: -90.4962504,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(ids[0].url);

    const table = await page.waitForSelector("#ds-tv");

    // eval() evaluates the selector ids in the browser
    const t = await table.$$eval("td:last-child", (tds) =>
      tds
        .map((td) => td.textContent.trim())
        .filter((t) => t.length)
        .filter((t) => t.match(/\d+\s*:\s*\d+/)),
    );

    util.setIqamaTimes(ids[0], t);
    util.setJumaTimes(ids[0], t.pop().match(/\d+\s*:\s*\d+\s*\w+/g));
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MO/islamic-foundation-of-greater-st-louis-daar-ul-islam-masjid-ballwin",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
