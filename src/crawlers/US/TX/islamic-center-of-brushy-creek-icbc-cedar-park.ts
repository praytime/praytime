import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a3870aa1-a206-4d07-b910-a8b1b510ed2e",
    name: "Islamic Center of Brushy Creek (ICBC)",
    url: "http://icbrushycreek.org/",
    timeZoneId: "America/Chicago",
    address: "1950 Brushy Creek Rd, Cedar Park, TX 78613, USA",
    placeId: "ChIJYbTOMDEtW4YRTXizT9pl5u8",
    geo: {
      latitude: 30.5081172,
      longitude: -97.792182,
    },
  },
];
const normalizeSpace = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

const normalizePrayerLabel = (text: string): string =>
  normalizeSpace(text).replace(/^duhur\b/i, "dhuhr");

const run = async () => {
  const $ = await util.load(ids[0].url);
  const iqamaByPrayer = new Map<util.StandardPrayerKey, string>();

  for (const row of $(".pt-table tbody tr").toArray()) {
    const cells = $(row).find("td");
    const prayerKey = util.getStandardPrayerKey(
      normalizePrayerLabel(cells.eq(0).text()),
    );
    if (!prayerKey) {
      continue;
    }

    const iqama =
      util.extractTimeAmPm(cells.eq(2).text()) ||
      util.extractTime(cells.eq(2).text());
    if (iqama && !iqamaByPrayer.has(prayerKey)) {
      iqamaByPrayer.set(prayerKey, iqama);
    }
  }

  const jumaTimes = $(".jm-table tbody tr")
    .toArray()
    .map((row) => {
      const salah = $(row).find("td").eq(2).text();
      return util.extractTimeAmPm(salah) || util.extractTime(salah);
    })
    .filter((time): time is string => Boolean(time));

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      iqamaByPrayer,
      "failed to parse ICBC iqama times",
    ),
  );

  if (jumaTimes.length === 0) {
    throw new Error("failed to parse ICBC juma times");
  }

  util.setJumaTimes(ids[0], jumaTimes);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-brushy-creek-icbc-cedar-park",
  ids,
  run,
};
