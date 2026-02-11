// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "0cc8834d-c32b-4228-9a78-6a798a8e2aff",
    name: "Masjid Al-Haqq",
    url: "http://iscf.org/masjid/masjid-al-haq/",
    timeZoneId: "America/New_York",
    address: "545 W Central Blvd, Orlando, FL 32801, USA",
    placeId: "ChIJc-Co_1R654gRvdYso_a8G2E",
    geo: {
      latitude: 28.5422285,
      longitude: -81.386837,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://mawaqit.net/en/alhaq-orlando-florida", {
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
  name: "US/FL/masjid-al-haqq-orlando",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
