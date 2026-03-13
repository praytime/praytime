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

const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayerRows = $("#timetable tr").toArray();
  const iqamaByPrayer = new Map<string, string>();
  const jumaTimes: string[] = [];

  for (const row of prayerRows) {
    const label = normalizePrayerLabel(
      $(row).find(".prayer-name").first().text(),
    );
    if (!label) {
      continue;
    }

    if (label.includes("friday")) {
      const jumaTime = util.extractTimeAmPm($(row).text());
      if (jumaTime) {
        jumaTimes.push(jumaTime);
      }
      continue;
    }

    const iqama = util.extractTimeAmPm(
      $(row).find(".iqama-time").first().text(),
    );
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

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/mosque-foundation-bridgeview",
  ids,
  run,
};
