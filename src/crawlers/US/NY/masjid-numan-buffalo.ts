// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "6c06b8ab-d5c9-4732-8486-881943ad4b11",
    name: "Masjid Nu'man",
    url: "http://masjidnuman.org/",
    timeZoneId: "America/New_York",
    address: "1373 Fillmore Ave, Buffalo, NY 14211, USA",
    placeId: "ChIJs7xYd50S04kRULgjE3D2eok",
    geo: {
      latitude: 42.9110977,
      longitude: -78.83887109999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-numan-buffalo",
  ids,
};
