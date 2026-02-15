import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e33ad2e4-6986-43c6-87ee-e566eaa906a0",
    name: "Islamic Center of Northern Virginia",
    url: "http://icnvt.com/",
    address: "4420 Shirley Gate Rd, Fairfax, VA 22030, USA",
    placeId: "ChIJW9VHHAVPtokRpLC4ENiNUwQ",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 38.845966,
      longitude: -77.341281,
    },
  },
];
const run = async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(
      "https://mawaqit.net/en/m/icnvt?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0",
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
    util.setJumaTimes(ids[0], j[0].match(/\d{1,2}\s*:\s*\d{1,2}/g));
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/islamic-center-of-northern-virginia",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
