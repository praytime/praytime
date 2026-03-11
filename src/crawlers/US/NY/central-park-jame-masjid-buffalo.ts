import type { CrawlerModule } from "../../../types";
import { createWnyMuslimsRun } from "../../../wnymuslims";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9be8972d-dd2e-40ac-9598-6a6ce7aaaacf",
    name: "Central Park Jame Masjid",
    url: "http://www.centralparkmasjid.com/",
    timeZoneId: "America/New_York",
    address: "97 Rodney Ave, Buffalo, NY 14214, USA",
    placeId: "ChIJU5TtGi8T04kRCCxd9HE1A60",
    geo: {
      latitude: 42.93603359999999,
      longitude: -78.8386762,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/central-park-jame-masjid-buffalo",
  ids,
  run: createWnyMuslimsRun(ids, {
    cardTitle: "Central Park Jame Masjid",
    addressText: "97 Rodney Ave",
  }),
};
