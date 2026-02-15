import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a8c69c48-ad8a-4a1a-8cc0-ec44aa06619f",
    name: "As-Siddiq Muslim Organization",
    url: "http://www.assiddiq.org/",
    timeZoneId: "America/New_York",
    address: "117-25 133rd St, South Ozone Park, NY 11420, USA",
    placeId: "ChIJEw2kJdNgwokRaiD2PiSdlWs",
    geo: {
      latitude: 40.676093,
      longitude: -73.805733,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(ids[0].url, { waitUntil: "networkidle0" });

    const searchFrame = async (frame: util.PuppeteerFrameLike) => {
      const e = await frame.$("#salaahTimeTable");
      if (e !== null) {
        // found correct frame
        const a = await util.pptMapToText(e, "td:last-child");
        util.setIqamaTimes(ids[0], a);
        const j = await util.pptMapToText(e, "td:nth-child(2)");
        util.setJumaTimes(ids[0], j.slice(5));
      } else {
        for (const child of frame.childFrames()) {
          await searchFrame(child);
        }
      }
    };
    await searchFrame(page.mainFrame());
  } finally {
    await browser.close();
  }
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/as-siddiq-muslim-organization-queens",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
