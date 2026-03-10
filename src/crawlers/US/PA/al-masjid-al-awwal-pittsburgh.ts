import { createPuppeteerRun } from "../../../ppt";
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
export const crawler: CrawlerModule = {
  name: "US/PA/al-masjid-al-awwal-pittsburgh",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle2" });

    const times = await page.$$eval("#prayerbar div", (divs) =>
      divs
        .map((div) => div.textContent ?? "")
        .map((text) => text.replace(/^\S+\s+/, "")),
    );
    util.setTimes(ids[0], times);
  }),
  puppeteer: crawlerPuppeteer,
};
