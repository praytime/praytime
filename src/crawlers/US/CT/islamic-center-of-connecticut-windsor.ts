import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d7aba698-1629-47f0-81e3-43eb4793950e",
    name: "Islamic Center of Connecticut",
    url: "http://www.icct.org/",
    timeZoneId: "America/New_York",
    address: "140 White Rock Dr, Windsor, CT 06095, USA",
    placeId: "ChIJ22c7-gFV5okR5VB31z_PwWc",
    geo: {
      latitude: 41.8117238,
      longitude: -72.6712632,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    // await page.goto(ids[0].url, { waitUntil: 'networkidle0' })
    await page.goto(ids[0].url);

    const a = await util.pptMapToText(page, "#IqamaTable td:last-child");

    util.setIqamaTimes(ids[0], a.filter(util.matchTime));
    util.setJumaTimes(ids[0], ["check website"]);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CT/islamic-center-of-connecticut-windsor",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
