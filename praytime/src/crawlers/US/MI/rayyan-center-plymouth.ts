// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "5a1e7a1d-ed50-41dc-ac2d-08b94e32e287",
    name: "Rayyan Center",
    url: "http://www.rayyancenter.org/",
    timeZoneId: "America/Detroit",
    address: "46441 Five Mile Rd, Plymouth, MI 48170, USA",
    placeId: "ChIJYZtjbJusJIgRbM5U867YGkA",
    geo: {
      latitude: 42.3940077,
      longitude: -83.5022957,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    const [$] = await Promise.all([
      util.load(ids[0].url),
      page.goto(
        "https://madina-widget-2.web.app/RayyanCenter/dailyprayertime",
        { waitUntil: "networkidle0" },
      ),
    ]);

    const a = await page.$$eval("td:last-child", (tds) =>
      tds.map((td) => td.textContent),
    );
    a.splice(1, 1); // remove sunrise
    util.setIqamaTimes(ids[0], a);

    const j = util.mapToText($, ".jumuatime tr:last-child td:nth-child(2)");
    util.setJumaTimes(ids[0], j);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/rayyan-center-plymouth",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
