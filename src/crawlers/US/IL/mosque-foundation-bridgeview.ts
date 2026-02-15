import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "613f529b-690a-4ddb-99b4-2ddbd5121e70",
    name: "Mosque Foundation",
    url: "http://www.mosquefoundation.org/",
    address: "7360 W 93rd St, Bridgeview, IL 60455, USA",
    placeId: "ChIJvbna_MY5DogRXE_OTtsvkLs",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.722827,
      longitude: -87.802968,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("http://www.mosquefoundation.org/", {
      waitUntil: "networkidle0",
    });

    const t = await page.$$eval(".iqama-time", (tds) =>
      tds.map((td) => td.textContent.trim()),
    );
    util.setIqamaTimes(ids[0], t);

    const j = await page.$$eval(".jumaTime-cell + td", (tds) =>
      tds.map((td) => td.textContent.trim()),
    );
    util.setJumaTimes(ids[0], j);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/mosque-foundation-bridgeview",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
