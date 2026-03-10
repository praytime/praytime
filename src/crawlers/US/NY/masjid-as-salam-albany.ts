import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c9f1fae4-b8e8-4bd5-86ea-86a4b7084000",
    name: "Masjid As-Salam",
    url: "http://www.assalammasjid.org/",
    timeZoneId: "America/New_York",
    address: "276 Central Ave, Albany, NY 12206, USA",
    placeId: "ChIJpfl7Y0oK3okRtyZlCC-pb-E",
    geo: {
      latitude: 42.663953,
      longitude: -73.77221399999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-as-salam-albany",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: ".prayer-list button" },
    mode: "setTimes",
  }),
};
