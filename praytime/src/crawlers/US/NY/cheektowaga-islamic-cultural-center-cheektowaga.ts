// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "bf90f8e9-2bad-4a01-a398-7fe0a04dc0a7",
    name: "Cheektowaga Islamic Cultural Center",
    url: "http://mosqueprayertimes.com/ciccmasjid",
    timeZoneId: "America/New_York",
    address: "3459 Harlem Rd, Cheektowaga, NY 14225, USA",
    placeId: "ChIJb_Ndo9Jz04kRydZJdnq4sLg",
    geo: {
      latitude: 42.9378555,
      longitude: -78.78368019999999,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url, { waitUntil: "networkidle0" });

    const a = await util.pptMapToText(page, ".timetable-verticle .brrt .tdy");
    a.splice(1, 1); // remove shuruq
    util.setTimes(ids[0], a);
  } finally {
    await browser.close();
  }
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/cheektowaga-islamic-cultural-center-cheektowaga",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
