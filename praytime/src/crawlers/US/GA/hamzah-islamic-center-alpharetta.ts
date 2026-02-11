import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "abe79662-a72c-44f8-a440-891fe79f18bf",
    name: "Hamzah Islamic Center",
    url: "http://www.masjidhamzah.com/",
    timeZoneId: "America/New_York",
    address: "665 Tidwell Rd, Alpharetta, GA 30004, USA",
    placeId: "ChIJS8iz3wG14RQRc78x7CKKeZk",
    geo: {
      latitude: 34.1173768,
      longitude: -84.24862879999999,
    },
  },
];

const run: CrawlerModule["run"] = async () => {
  const primary = ids[0];
  if (!primary) {
    throw new Error("crawler ids is empty");
  }

  const browser = await puppeteer.launch();

  try {
    const page = await browser.newPage();
    await page.goto(primary.url ?? "", { waitUntil: "networkidle0" });

    const iqama = await util.pptMapToText(page, ".ptTable td:nth-child(3)");
    const jumaRaw = await util.pptMapToText(page, "h4 + div > p");
    const juma = jumaRaw
      .slice(0, 2)
      .map((line) => util.extractTimeAmPm(line))
      .filter((line) => line.length > 0);

    util.setIqamaTimes(primary, iqama);
    util.setJumaTimes(primary, juma);

    return ids;
  } finally {
    await browser.close();
  }
};

export const crawler: CrawlerModule = {
  name: "US/GA/hamzah-islamic-center-alpharetta",
  puppeteer: true,
  ids,
  run,
};
