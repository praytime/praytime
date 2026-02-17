import puppeteer from "puppeteer";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c1a0a188-7058-4683-bc1b-f2613139ad3b",
    name: "Fraserview Muslim Community Services",
    url: "http://thefmcs.ca/",
    timeZoneId: "America/Vancouver",
    address: "6436 Fraser St, Vancouver, BC V5W 3A6, Canada",
    placeId: "ChIJ7SyIShV0hlQRDXG6F58w8n0",
    geo: {
      latitude: 49.2261277,
      longitude: -123.0905783,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for CA/BC/fraserview-muslim-community-services-vancouver",
    );
  }

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://thefmcs.ca/prayer");
    await page.waitForSelector(".prayer-grid-wrapper");

    const rows = await page.$$eval(".prayer-grid-wrapper", (elements) =>
      elements.map((element) => {
        const prayerCells = Array.from(
          element.querySelectorAll(".prayer-time"),
        ) as Array<{ textContent: string | null }>;
        const cells = prayerCells
          .map((value) => value.textContent?.trim() ?? "")
          .filter((value) => value.length > 0);
        return cells;
      }),
    );
    const byPrayer = new Map(
      rows
        .filter((cells) => cells.length > 0)
        .map((cells) => [cells[0]?.toLowerCase() ?? "", cells.slice(1)]),
    );

    const fajr = byPrayer.get("fajr")?.[1] ?? "";
    const zuhr = byPrayer.get("dhur")?.[1] ?? "";
    const asr = byPrayer.get("asr")?.[1] ?? "";
    const maghrib = byPrayer.get("maghrib")?.[1] ?? "";
    const isha = byPrayer.get("isha")?.[1] ?? "";
    const juma = byPrayer.get("jumah") ?? [];

    if (!fajr || !zuhr || !asr || !maghrib || !isha) {
      throw new Error("missing prayer rows from .prayer-grid-wrapper");
    }

    util.setIqamaTimes(masjid, [fajr, zuhr, asr, maghrib, isha]);
    util.setJumaTimes(masjid, juma);
  } finally {
    await browser.close();
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/fraserview-muslim-community-services-vancouver",
  ids,
  run,
  puppeteer: crawlerPuppeteer,
};
