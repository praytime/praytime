// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "e56d054a-7193-47ff-8295-3fad39e50a3b",
    name: "Islamic Center of Reseda",
    url: "http://masjidreseda.com/",
    timeZoneId: "America/Los_Angeles",
    address: "18206 Victory Blvd, Tarzana, CA 91335, USA",
    placeId: "ChIJoUClMZyZwoARt3nI76IUCQw",
    geo: {
      latitude: 34.1862262,
      longitude: -118.5297247,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-reseda-los-angeles",
  ids,
};
