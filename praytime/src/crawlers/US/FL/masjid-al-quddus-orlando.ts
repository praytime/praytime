// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "c5b2b553-77db-4b7b-b470-bb06c89c7b40",
    name: "Masjid Al-Quddus",
    url: "http://iscf.org/masjid/masijid-al-quddus/",
    timeZoneId: "America/New_York",
    address: "Orlando, FL 32805, USA",
    placeId: "ChIJ82GcWat754gRXzkl9qQdFzg",
    geo: {
      latitude: 28.5387389,
      longitude: -81.38914009999999,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://mawaqit.net/en/alquds-orlando-florida", {
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
  name: "US/FL/masjid-al-quddus-orlando",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
