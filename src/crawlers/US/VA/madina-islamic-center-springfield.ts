// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "d70df738-70b3-40a8-aaf0-08eca0c57768",
    name: "Madina Islamic Center",
    url: "https://madinamasjid.org/",
    timeZoneId: "America/New_York",
    address: "6805 Backlick Rd, Springfield, VA 22150, USA",
    placeId: "ChIJx_qbY1Ctt4kRXafDSP5aR9Q",
    geo: {
      latitude: 38.7707861,
      longitude: -77.1836306,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(
      "https://mawaqit.net/en/m/madina-springfield?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0",
      { waitUntil: "networkidle0" },
    );

    const t = await page.$$eval(".wait", (es) =>
      es.map((e) => e.textContent.trim()),
    );
    util.setIqamaTimes(ids[0], t);

    const j = await page.$$eval(".joumouaa", (es) =>
      es.map((e) => e.textContent.trim()),
    );
    // j = ['Jumua\n1:00PM\n2:00PM']
    util.setJumaTimes(ids[0], j[0].match(util.timeRxG));
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/madina-islamic-center-springfield",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
