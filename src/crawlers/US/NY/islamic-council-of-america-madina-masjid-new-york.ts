// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "67350cb0-e6a0-4b6a-b680-62a15d70a35f",
    name: "Islamic Council of America (Madina Masjid)",
    url: "http://madinamasjidnyc.org/",
    timeZoneId: "America/New_York",
    address: "401 E 11th St, New York, NY 10009, USA",
    placeId: "ChIJ1Uxi7Z1ZwokRObI0kHr-2Uk",
    geo: {
      latitude: 40.7293685,
      longitude: -73.9837228,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-council-of-america-madina-masjid-new-york",
  ids,
};
