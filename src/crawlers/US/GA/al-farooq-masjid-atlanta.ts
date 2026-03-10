import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

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

export const crawler: CrawlerModule = {
  name: "US/GA/al-farooq-masjid-atlanta",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: "section#prayerSchedule td:last-child" },
    jumaDefault: ["check website", "check website"],
  }),
};
