// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "fad49146-9293-498e-861e-aeca0b836abd",
    name: "Islamic Center of East Lansing",
    url: "http://lansingislam.com/",
    timeZoneId: "America/Detroit",
    address: "920 S Harrison Rd, East Lansing, MI 48823, USA",
    placeId: "ChIJnXBspnHCIogR1lRplpAjMPk",
    geo: {
      latitude: 42.72396489999999,
      longitude: -84.49419259999999,
    },
  },
];

// alt: ChIJqWjTK9XDIogRfx_4Ob4JHOY
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url);

    await page.waitForSelector(".tableizer-table");

    const t = await util.pptMapToText(page, ".tableizer-table td:last-child");

    t.splice(1, 1); // remove sunrise

    util.setIqamaTimes(ids[0], t);

    const j = await util.pptMapToText(page, ".aSS");

    util.setJumaTimes(ids[0], j.map(util.matchTimeAmPmG).shift());
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-east-lansing-east-lansing",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
