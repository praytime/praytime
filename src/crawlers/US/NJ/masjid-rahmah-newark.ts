import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a082447d-7e50-4ee5-b333-f39460ad2701",
    name: "Masjid Rahmah",
    url: "http://www.masjidrahmah.org/",
    timeZoneId: "America/New_York",
    address: "483 Washington St, Newark, NJ 07102, USA",
    placeId: "ChIJJ8Nc5HFTwokRJuRXGv387uM",
    geo: {
      latitude: 40.7281572,
      longitude: -74.17993059999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NJ/masjid-rahmah-newark",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url, { waitUntil: "networkidle0" });

    const times = await page.$$eval(".prayerbox", (es) =>
      es.map((e) => e.textContent),
    );
    util.setTimes(ids[0], times.map(util.extractTimeAmPm));
  }),
  puppeteer: true,
};
