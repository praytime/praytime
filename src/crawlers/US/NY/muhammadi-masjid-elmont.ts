import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c537cfbd-071a-4ba1-b477-a711da89d5ac",
    name: "Muhammadi Masjid",
    url: "http://muhammadimasjid.org/",
    timeZoneId: "America/New_York",
    address: "681 Elmont Rd, Elmont, NY 11003, USA",
    placeId: "ChIJjUVmH75jwokRWdR9sL-Fm5I",
    geo: {
      latitude: 40.6930649,
      longitude: -73.7180645,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/muhammadi-masjid-elmont",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: ".prayer-list button" },
    mode: "setTimes",
  }),
};
