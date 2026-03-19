import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const normalizePrayerLabel = (value: string): string =>
  util.normalizeSpace(value).toLowerCase();

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "613f529b-690a-4ddb-99b4-2ddbd5121e70",
    name: "Mosque Foundation",
    url: "https://mosquefoundation.org/",
    address: "7360 W 93rd St, Bridgeview, IL 60455, USA",
    placeId: "ChIJvbna_MY5DogRXE_OTtsvkLs",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.722827,
      longitude: -87.802968,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/mosque-foundation-bridgeview",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle0" });

    const prayerRows = await page.$$eval("#timetable tr", (rows) =>
      rows.map((row) => {
        const label = row
          .querySelector(".prayer-name")
          ?.textContent?.replace(/\s+/g, " ")
          .trim();
        const iqama = row
          .querySelector(".iqama-time")
          ?.textContent?.replace(/\s+/g, " ")
          .trim();
        const text = row.textContent?.replace(/\s+/g, " ").trim() ?? "";

        return { iqama, label, text };
      }),
    );

    const iqamaByPrayer = new Map<string, string>();
    const jumaTimes: string[] = [];

    for (const row of prayerRows) {
      const label = normalizePrayerLabel(row.label ?? "");
      if (!label) {
        continue;
      }

      if (label.includes("friday")) {
        const jumaTime = util.extractTimeAmPm(row.text);
        if (jumaTime) {
          jumaTimes.push(jumaTime);
        }
        continue;
      }

      const iqama = util.extractTimeAmPm(row.iqama);
      if (!iqama) {
        continue;
      }

      iqamaByPrayer.set(label, iqama);
    }

    util.setIqamaTimes(ids[0], [
      iqamaByPrayer.get("fajr"),
      iqamaByPrayer.get("dhuhr") ?? iqamaByPrayer.get("zuhr"),
      iqamaByPrayer.get("asr"),
      iqamaByPrayer.get("maghrib"),
      iqamaByPrayer.get("isha"),
    ]);
    util.setJumaTimes(ids[0], jumaTimes);
  }),
  puppeteer: true,
};
