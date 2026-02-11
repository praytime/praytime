// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "c2f4a353-09ac-4016-accc-a730192dbf6f",
    name: "Masjid Bilal",
    url: "http://masjidbilalcny.org/",
    timeZoneId: "America/New_York",
    address: "507 Pond St, Syracuse, NY 13208, USA",
    placeId: "ChIJh4JpL7Tz2YkRKhxl7-c5qYY",
    geo: {
      latitude: 43.0664542,
      longitude: -76.1513921,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-bilal-syracuse",
  ids,
};
