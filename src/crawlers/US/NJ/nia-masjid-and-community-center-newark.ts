import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "053c319c-7114-49f1-87cc-a54eb86cf658",
    name: "NIA Masjid & Community Center",
    url: "http://www.niamasjid.org/",
    timeZoneId: "America/New_York",
    address: "231 Roseville Ave, Newark, NJ 07107, USA",
    placeId: "ChIJn38npZZUwokRwMMnjrBAjeY",
    geo: {
      latitude: 40.75871799999999,
      longitude: -74.189555,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NJ/nia-masjid-and-community-center-newark",
  ids,
};
