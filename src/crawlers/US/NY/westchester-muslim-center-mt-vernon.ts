// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "c7e4eb94-49ef-4a54-add5-11ce61d0dae2",
    name: "Westchester Muslim Center",
    url: "http://westchestermuslim.org/",
    timeZoneId: "America/New_York",
    address: "22 Brookfield Rd, Mt Vernon, NY 10552, USA",
    placeId: "ChIJ0zU3nGCNwokRwQ1L9WLFhFc",
    geo: {
      latitude: 40.9273528,
      longitude: -73.8176889,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/westchester-muslim-center-mt-vernon",
  ids,
};
