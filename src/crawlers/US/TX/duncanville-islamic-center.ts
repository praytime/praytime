import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_TIMES_URL = "https://www.mydicenter.org/";
const PRAYER_CARD_RX =
  /<p class="prayer-card-title">\s*([^<]+?)\s*<\/p>\s*<p class="prayer-card-time">\s*([^<]+?)\s*<\/p>(?:\s*<p class="prayer-card-title">\s*([^<]+?)\s*<\/p>\s*<p class="prayer-card-time">\s*([^<]+?)\s*<\/p>)?/g;

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f53572b2-8ac0-47b9-a010-f4cff10800da",
    name: "Duncanville Islamic Center",
    url: PRAYER_TIMES_URL,
    timeZoneId: "America/Chicago",
    address: "1419 Acton Ave, Duncanville, TX 75137, USA",
    geo: {
      latitude: 32.63412,
      longitude: -96.901117,
    },
    placeId: "ChIJhW1M6eyRToYRljThXe1ulDc",
  },
];

const normalizePrayerLabel = (value: string): string =>
  value.replace(/^asar/i, "asr");

const run: CrawlerModule["run"] = async () => {
  const { data } = await util.get<string>(PRAYER_TIMES_URL);
  if (typeof data !== "string") {
    throw new Error("failed to load Duncanville prayer times page");
  }

  const prayers = new Map<util.StandardPrayerKey, string>();
  const jumaTimes: string[] = [];

  for (const match of data.matchAll(PRAYER_CARD_RX)) {
    const title = (match[1] ?? "").trim();
    const primaryTime = util.normalizeLooseClock(match[2]);
    const secondaryLabel = (match[3] ?? "").trim().toLowerCase();
    const secondaryTime = util.normalizeLooseClock(match[4]);

    if (/jummah/i.test(title)) {
      if (primaryTime) {
        jumaTimes.push(primaryTime);
      }
      continue;
    }

    const prayerKey = util.getStandardPrayerKey(normalizePrayerLabel(title));
    if (!prayerKey) {
      continue;
    }

    const iqamaTime =
      secondaryLabel === "iqamah" && secondaryTime
        ? secondaryTime
        : primaryTime;
    if (!iqamaTime) {
      continue;
    }

    prayers.set(prayerKey, iqamaTime);
  }

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayers,
      "failed to parse Duncanville prayer times",
    ),
  );
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/duncanville-islamic-center",
  ids,
  run,
};
