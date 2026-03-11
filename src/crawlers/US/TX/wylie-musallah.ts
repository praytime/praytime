import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f9144d4a-8ece-459c-81e1-62b7d7642074",
    name: "Wylie Musallah",
    url: "https://icwtx.org/",
    timeZoneId: "America/Chicago",
    address: "3990 Lakeway Dr, St Paul, TX 75098, USA",
    geo: {
      latitude: 33.048499,
      longitude: -96.567125,
    },
    placeId: "ChIJdXyLjSUFTIYRahClmXUEeOM",
  },
];
const run = async () => {
  const response = await util.get(ids[0].url ?? "");
  const cards = [
    ...String(response.data).matchAll(
      /<div class="inner-wrap prayer-card">[\s\S]*?<p class="prayer-card-title">([^<]+)<\/p>[\s\S]*?<p class="prayer-card-time">\s*([^<]+?)\s*<\/p>(?:[\s\S]*?<p class="prayer-card-title">Iqamah<\/p>[\s\S]*?<p class="prayer-card-time">\s*([^<]+?)\s*<\/p>)?/g,
    ),
  ];

  const iqamaByPrayer = new Map<util.StandardPrayerKey, string>();
  const jumaTimes: string[] = [];
  for (const card of cards) {
    const label = card[1]?.trim() ?? "";
    const primaryTime = util.extractTimeAmPm(card[2]);
    const iqamaTime = util.extractTimeAmPm(card[3]) || primaryTime;
    if (!iqamaTime) {
      continue;
    }

    const prayerKey = util.getStandardPrayerKey(label);
    if (prayerKey) {
      iqamaByPrayer.set(prayerKey, iqamaTime);
      continue;
    }

    if (/jummah/i.test(label)) {
      jumaTimes.push(iqamaTime);
    }
  }

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      iqamaByPrayer,
      "incomplete Islamic Center of Wylie iqama times",
    ),
  );
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/wylie-musallah",
  ids,
  run,
};
