// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "a1908814-7aaa-4ae0-8364-e62a38235014",
    name: "Islamic Center of Northridge, Granada Hills Masjid",
    url: "http://www.goicn.org/",
    timeZoneId: "America/Los_Angeles",
    address: "11439 Encino Ave, Granada Hills, CA 91344, USA",
    placeId: "ChIJA0-31M6awoARsSJL1MmrO1o",
    geo: {
      latitude: 34.2786099,
      longitude: -118.5156093,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-northridge-granada-hills-masjid-los-angeles",
  ids,
};
