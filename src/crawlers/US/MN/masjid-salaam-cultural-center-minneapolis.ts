// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "dc84a170-4bb7-4f3a-a97b-61dda8858b40",
    name: "Masjid Salaam Cultural Center",
    url: "http://masjidsalaam.com/",
    timeZoneId: "America/Chicago",
    address: "3141 NE Central Ave, Minneapolis, MN 55418, USA",
    placeId: "ChIJU9PUmeAts1IR635ykZ8eBPM",
    geo: {
      latitude: 45.02528299999999,
      longitude: -93.2469229,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-salaam-cultural-center-minneapolis",
  ids,
};
