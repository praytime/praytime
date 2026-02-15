import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "003db6a8-9c1b-4aed-b2f1-49b07e52dbe2",
    name: "Al-Farooq Masjid",
    url: "http://alfarooqmasjid.org/",
    timeZoneId: "America/New_York",
    address: "442 14th St NW, Atlanta, GA 30318, USA",
    placeId: "ChIJGZ7S8PME9YgRIf2DqOPfFxs",
    geo: {
      latitude: 33.7858232,
      longitude: -84.4015484,
    },
  },
];

const run: CrawlerModule["run"] = async () => {
  const primary = ids[0];
  if (!primary) {
    throw new Error("crawler ids is empty");
  }

  const $ = await util.load(primary.url ?? "");

  const iqama = util.mapToText($, "section#prayerSchedule td:last-child");
  util.setIqamaTimes(primary, iqama);

  util.setJumaTimes(primary, ["check website", "check website"]);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/GA/al-farooq-masjid-atlanta",
  ids,
  run,
};
