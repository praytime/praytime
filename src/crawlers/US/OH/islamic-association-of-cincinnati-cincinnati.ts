import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "af74625a-0866-4ecb-b012-db6042b4181c",
    name: "Islamic Association of Cincinnati",
    url: "http://cliftonmosque.org/",
    timeZoneId: "America/New_York",
    address: "3668 Clifton Ave, Cincinnati, OH 45220, USA",
    placeId: "ChIJdzCM9IGzQYgRsKTEW4oSAK0",
    geo: {
      latitude: 39.1493373,
      longitude: -84.518059,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://masjidbox.com/w/g9SVpNn0UjGfuuIqOf387");

    const [frame] = await Promise.all([
      util.waitForFrame(page, "masjidbox.com"),
      // networkidle0: all tcp connections idle for at least 500 ms
      page.goto(ids[0].url, { waitUntil: "networkidle0" }),
    ]);

    await frame.waitForSelector("div.time.mono");

    const t = await frame.$$eval("div.time.mono", (divs) =>
      divs.map((div) => {
        const p = div.textContent?.trim().match(/(\d{1,2})(\d{2}\w+)/);
        // convert 630AM => 6:30AM
        return `${p?.[1] ?? ""}:${p?.[2] ?? ""}`;
      }),
    );
    t.splice(1, 1); // remove sunrise
    util.setIqamaTimes(ids[0], t);

    util.setJumaTimes(ids[0], ["check website"]);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/OH/islamic-association-of-cincinnati-cincinnati",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
