import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5874495c-7d84-4816-8049-eb50b3579d26",
    name: "Islamic Center of Hazelwood Dar Aljalal Masjid",
    url: "http://www.daraljalal.com/",
    timeZoneId: "America/Chicago",
    address: "8945 Dunn Rd, Hazelwood, MO 63042, USA",
    placeId: "ChIJpQ22Tf0234cRuZDj-MYzCLI",
    geo: {
      latitude: 38.77731089999999,
      longitude: -90.3463771,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const prayers = new Map<util.StandardPrayerKey, string>();
  const jumaTimes: string[] = [];

  $(".pr-tm-bx").each((_, item) => {
    const text = util.normalizeSpace($(item).text());
    const label = util.normalizeSpace($(item).find("h6").first().text());
    const prayerKey = util.getStandardPrayerKey(label);
    if (prayerKey) {
      const iqamah = text.match(
        /Iqamah:\s*(\d{1,2}\s*:\s*\d{2}\s*[AP]\.?M\.?)/i,
      );
      if (iqamah?.[1] && !prayers.has(prayerKey)) {
        prayers.set(prayerKey, util.extractTimeAmPm(iqamah[1]));
      }
      return;
    }

    if (/jummah/i.test(label)) {
      const time = util.extractTimeAmPm(text);
      if (time) {
        jumaTimes.push(time);
      }
    }
  });

  util.setIqamaTimes(
    ids[0],
    util.requireStandardPrayerTimes(
      prayers,
      "failed to parse Dar Aljalal iqama times",
    ),
  );
  if (jumaTimes.length > 0) {
    util.setJumaTimes(ids[0], jumaTimes);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MO/islamic-center-of-hazelwood-dar-aljalal-masjid-hazelwood",
  ids,
  run,
};
