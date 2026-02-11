// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f758366a-ea80-4582-bebf-75e2c82d6d6a",
    name: "Dar Al Salam Islamic Center",
    url: "http://www.daicwestland.org/",
    timeZoneId: "America/Detroit",
    address: "27758 Warren Rd, Westland, MI 48185, USA",
    placeId: "ChIJ8x8kw0BLO4gR_eVsco8PW5Y",
    geo: {
      latitude: 42.340724,
      longitude: -83.3167629,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/dar-al-salam-islamic-center-westland",
  ids,
};
