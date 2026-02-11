// @ts-nocheck

import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids = [
  {
    uuid4: "4309d979-d730-4a9e-a12e-316a0f6218da",
    name: "Islamic Center of Greater Miami",
    url: "https://miamimuslim.org/",
    timeZoneId: "America/New_York",
    address: "4305 NW 183rd St, Miami Gardens, FL 33055, USA",
    placeId: "ChIJXzKFYoav2YgREiNAZ9Ly22M",
    geo: {
      latitude: 25.9407944,
      longitude: -80.2718556,
    },
  },
  {
    uuid4: "23932380-e633-4c90-a41d-6218f72be2cf",
    name: "Miami Masjid",
    url: "https://miamimuslim.org/",
    timeZoneId: "America/New_York",
    address: "7350 NW 3rd St, Miami, FL 33126, USA",
    placeId: "ChIJLzBk26652YgRoq6Ojwn5pFo",
    geo: {
      latitude: 25.7734119,
      longitude: -80.3147256,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url);

    // TODO how to do this with cheerio
    const aa = await page.$$eval(
      "span", // all span elements...
      (ss) =>
        ss
          .filter((s) => [...s.childNodes].find((n) => n.nodeType === 3)) // ...with text nodes
          .filter((s) =>
            s.innerText.match(/\d{1,2}\s*:\s*\d{1,2}\s*[ap]\.?m\.?/i),
          ) // ...with time strings
          .map((s) => s.innerText) // ...get the text
          .map((t) => t.split("\n")),
    ); // ...split on newlines

    util.setIqamaTimes(ids[0], aa[0]);
    util.setJumaTimes(ids[0], aa[1]);

    util.setIqamaTimes(ids[1], aa[2]);
    util.setJumaTimes(ids[1], aa[3]);
  } finally {
    await browser.close();
  }
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-greater-miami-miami-gardens",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
