// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "506ce41a-e1cf-4a96-9aa6-c880e520359d",
    name: "Masjid Al Raheem",
    url: "http://iscf.org/masjid/masjid-al-alrahim/",
    timeZoneId: "America/New_York",
    address: "4962 Old Winter Garden Rd, Orlando, FL 32811, USA",
    placeId: "ChIJLUbaknV554gRT415vYgBO4o",
    geo: {
      latitude: 28.5423395,
      longitude: -81.4460082,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://mawaqit.net/en/arraheem-orlando-florida", {
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
  name: "US/FL/masjid-al-raheem-orlando",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
