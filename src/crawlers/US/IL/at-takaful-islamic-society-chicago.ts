import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "65e107c8-b056-457a-a6f1-06280d6410f0",
    name: "At-Takaful Islamic Society",
    url: "http://icconline.org/",
    address: "5933 N Lincoln Ave, Chicago, IL 60659, USA",
    placeId: "ChIJvbnzRRrOD4gRP2mO5m6be7E", // ChIJ9_F0fCXPD4gRT0QPjaqS_hM     Mosque
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.989204,
      longitude: -87.70492,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url);

    const a = await util.pptMapToText(page, ".item-qty");
    a.splice(1, 1); // remove sunrise
    util.setIqamaTimes(ids[0], a);

    let j = await util.pptMapToText(page, "h4 > strong");
    j = j
      .map((time) => time.match(util.timeAmPmRxG)?.[0])
      .filter(
        (value): value is string => value !== undefined && value.length > 0,
      );
    util.setJumaTimes(ids[0], j);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/at-takaful-islamic-society-chicago",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
