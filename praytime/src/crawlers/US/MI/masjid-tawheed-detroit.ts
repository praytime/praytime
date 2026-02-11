// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "964ac3fd-b093-45db-bcea-69f6eace8bda",
    name: "Masjid Tawheed",
    url: "http://masjidtawheed.org/",
    timeZoneId: "America/Detroit",
    address: "18640 W Warren Ave, Detroit, MI 48228, USA",
    placeId: "ChIJLXA1JzE1O4gRLBt-kfztbe4",
    geo: {
      latitude: 42.34358,
      longitude: -83.222724,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-tawheed-detroit",
  ids,
};
