import { createMasjidBoxRun } from "../../../masjidbox";
import type { CrawlerModule } from "../../../types";

const PRAYER_TIMES_URL =
  "https://masjidbox.com/prayer-times/islamic-society-of-greater-kansas-city";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8094257d-2b5a-4857-88ba-7ddc96d1d084",
    name: "Islamic Society of Kansas City (ISGKC)",
    url: "http://www.isgkc.org/",
    timeZoneId: "America/Chicago",
    address: "8501 E 99 St, Kansas City, MO 64134, USA",
    placeId: "ChIJn8jbd9jmwIcRUr9dus81CkM",
    geo: {
      latitude: 38.943845,
      longitude: -94.4911243,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MO/islamic-society-of-kansas-city-isgkc-kcmo",
  ids,
  run: createMasjidBoxRun(ids, PRAYER_TIMES_URL),
};
