import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ce7bfa06-83ca-4a74-8824-ec91809aff58",
    name: "ISCF Masjid Al-Jabbar",
    url: "https://iscf.org/masjid/masjid-al-jabbar/",
    timeZoneId: "America/New_York",
    address: "5200 Schumacher Rd, Sebring, FL 33872, USA",
    placeId: "ChIJ3StlwHn43IgRcMS-cpdyq-c",
    geo: {
      latitude: 27.5150483,
      longitude: -81.51973079999999,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://mawaqit.net/en/aljabbar-sebring-florida", {
      waitUntil: "networkidle0",
    });

    const divs = await page.$$eval(".prayers > div", (es) =>
      es.map((e) => e.textContent.trim()),
    );

    const a = divs
      .map((t) => t.split("\n"))
      .map(([_, az, iq]) => {
        if (util.matchTimeAmPm(iq)) {
          // iqama time exact
          return util.extractTimeAmPm(iq);
        } else if (iq.match(/\s*[+-]\s*\d+/)) {
          // iqama time offset from azan
          return [az]
            .map(util.hourMinuteAmPmToMinutes)
            .map((minutes) => minutes + util.minuteOffsetFromText(iq))
            .map(util.minutesTohourMinute)
            .shift();
        } else {
          // ?
          return `${az}|${iq}`;
        }
      });

    util.setIqamaTimes(ids[0], a);

    const j = await page.$$eval('div.joumouaa [class*="joumouaa"]', (es) =>
      es.map((e) => e.textContent.trim()),
    );
    util.setJumaTimes(ids[0], j);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/iscf-masjid-al-jabbar-sebring",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
