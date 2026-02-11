// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d35eb2d7-a1e7-4721-bbe8-048370f8df58",
    name: "Assafa Islamic Center Inc",
    url: "http://assafaislamiccenter.org/",
    timeZoneId: "America/New_York",
    address: "172 Eldridge St, New York, NY 10002, USA",
    placeId: "ChIJWwWFAIRZwokR9w7H0336bB4",
    geo: {
      latitude: 40.7201732,
      longitude: -73.9907181,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/assafa-islamic-center-inc-new-york",
  ids,
};
