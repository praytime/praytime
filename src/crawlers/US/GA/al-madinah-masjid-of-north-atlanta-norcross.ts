import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3154a91f-911e-4923-92ca-65d9b5b0dc82",
    name: "Al-Madinah Masjid of North Atlanta",
    url: "http://www.almadinahatl.org/",
    timeZoneId: "America/New_York",
    address: "6014 Goshen Springs Rd, Norcross, GA 30071, USA",
    placeId: "ChIJTVAR2rmm9YgR99-QgWUk3Mk",
    geo: {
      latitude: 33.916002,
      longitude: -84.20537580000001,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/GA/al-madinah-masjid-of-north-atlanta-norcross",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle0" });

    type BrowserCell = { textContent?: string | null };
    type BrowserRow = {
      querySelectorAll: (selector: string) => ArrayLike<BrowserCell>;
    };

    const tables = await page.$$eval("table", (tables) => {
      const normalize = (text: string): string =>
        text.replace(/\s+/g, " ").trim();

      return tables.map((table) => ({
        rows: Array.from(table.querySelectorAll("tr") as ArrayLike<BrowserRow>)
          .map((row: BrowserRow) =>
            Array.from(row.querySelectorAll("th,td") as ArrayLike<BrowserCell>)
              .map((cell: BrowserCell) => normalize(cell.textContent ?? ""))
              .filter(Boolean),
          )
          .filter((row) => row.length > 0),
        text: normalize(table.textContent ?? ""),
      }));
    });

    const prayerTable = tables.find(
      (table) => /fajr/i.test(table.text) && /maghrib/i.test(table.text),
    );
    if (!prayerTable) {
      throw new Error("missing rendered salah table");
    }

    const prayerRows = prayerTable.rows.filter(
      (row) =>
        row.length >= 3 && /fajr|duhr|asr|maghrib|isha/i.test(row[0] ?? ""),
    );
    const iqamaTimes = prayerRows.map((row) => row.at(-1) ?? "");

    const jumaTable = tables.find(
      (table) => /jumu/i.test(table.text) && /khutbah/i.test(table.text),
    );
    if (!jumaTable) {
      throw new Error("missing rendered juma table");
    }

    const jumaRow = jumaTable.rows.find(
      (row) =>
        row.length >= 3 &&
        /jumu/i.test(row[0] ?? "") &&
        /\d/.test(row.at(-1) ?? ""),
    );
    if (!jumaRow) {
      throw new Error("missing rendered juma row");
    }

    util.setIqamaTimes(
      ids[0],
      iqamaTimes.map((time) => util.extractTimeAmPm(time)),
    );
    util.setJumaTimes(ids[0], [util.extractTimeAmPm(jumaRow.at(-1) ?? "")]);
  }),
  puppeteer: crawlerPuppeteer,
};
