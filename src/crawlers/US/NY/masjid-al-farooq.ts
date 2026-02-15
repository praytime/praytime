import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "52a95e1e-5d7e-41e5-8461-1a3276951b34",
    name: "Masjid Al-Farooq",
    url: "https://www.facebook.com/MasjidNY/",
    timeZoneId: "America/New_York",
    address: "554 Atlantic Ave, Brooklyn, NY 11217, USA",
    placeId: "ChIJ1Wfbmq1bwokRUvKq1ayw3VY",
    geo: {
      latitude: 40.6846404,
      longitude: -73.9795129,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-farooq",
  ids,
};
