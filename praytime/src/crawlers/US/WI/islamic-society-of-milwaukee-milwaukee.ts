// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "90346b00-804c-410c-8d81-945a6cf544c8",
    name: "Islamic Society of Milwaukee",
    url: "https://www.ismonline.org/ism-center.html",
    timeZoneId: "America/Chicago",
    address: "4707 South 13th Street, Milwaukee, WI 53221, USA",
    placeId: "ChIJTeFDRdQWBYgRwISakD6RR40",
    geo: {
      latitude: 42.9588699,
      longitude: -87.92991640000001,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url, { waitUntil: "networkidle0" });

    const t = await page.$$eval(
      "#iqamaTimeContainer .circular-bar-content",
      (tds) => tds.map((td) => td.textContent.match(/\d+\s*:\s*\d+\s*\w+/)[0]),
    );
    util.setJumaTimes(ids[0], [t[2]]);
    t.splice(2, 1); // remove juma time
    util.setIqamaTimes(ids[0], t);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WI/islamic-society-of-milwaukee-milwaukee",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
