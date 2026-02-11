// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f0b2015c-8f5a-4db6-825a-810ffd56d2a8",
    name: "Albanian American Islamic Center",
    url: "http://www.aaic-of-queens.com/",
    timeZoneId: "America/New_York",
    address: "7224 Myrtle Ave, Glendale, NY 11385, USA",
    placeId: "ChIJg_3xIHhewokRa0Bfp2CePVU",
    geo: {
      latitude: 40.7021272,
      longitude: -73.8773491,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/albanian-american-islamic-center-queens",
  ids,
};
