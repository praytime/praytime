// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "6c6ab0f1-f8c2-4b96-a5c8-7d3c8faad8dd",
    name: "Masjid Al-Malik",
    url: "https://iscf.org/masjid/masjid-al-malik/",
    timeZoneId: "America/New_York",
    address: "2018 Rouse Rd, Orlando, FL 32817, USA",
    placeId: "ChIJhYetIidm54gR4jDKvzFk6OU",
    geo: {
      latitude: 28.5732199,
      longitude: -81.2247321,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://mawaqit.net/en/almalik-orlando-florida", {
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
  name: "US/FL/masjid-al-malik-orlando",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
