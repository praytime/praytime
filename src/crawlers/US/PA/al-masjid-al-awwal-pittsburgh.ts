import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "62ad1a1b-1316-4c16-b480-a068ba527958",
    name: "al-Masjid al-Awwal",
    url: "http://www.firstmuslimmosque.com/",
    timeZoneId: "America/New_York",
    address: "1911 Wylie Ave, Pittsburgh, PA 15219, USA",
    placeId: "ChIJ1fToON_zNIgRj0KeknwXIFY",
    geo: {
      latitude: 40.4441092,
      longitude: -79.9817465,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url, { waitUntil: "networkidle2" });

    const a = await page.$$eval("#prayerbar div", (ds) =>
      ds.map((d) => d.textContent).map((t) => t.replace(/^\S+\s+/, "")),
    );
    util.setTimes(ids[0], a);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/PA/al-masjid-al-awwal-pittsburgh",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
