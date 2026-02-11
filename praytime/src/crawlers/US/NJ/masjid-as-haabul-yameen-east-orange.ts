// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "3e20fa67-9dd4-4b39-86ad-18f2451ff60b",
    name: "Masjid As haabul Yameen",
    url: "https://www.masjidashabulyameen.com/",
    timeZoneId: "America/New_York",
    address: "224 N 18th St, East Orange, NJ 07017, USA",
    placeId: "ChIJ5zXB979UwokRU02BrEIHIbQ",
    geo: {
      latitude: 40.7651062,
      longitude: -74.1954422,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NJ/masjid-as-haabul-yameen-east-orange",
  ids,
};
