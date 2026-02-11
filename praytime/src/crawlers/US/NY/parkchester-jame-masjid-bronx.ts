// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "4281f1cb-a384-4cce-b008-76f779f0d4fc",
    name: "Parkchester Jame Masjid",
    url: "https://www.facebook.com/pjm1203/",
    timeZoneId: "America/New_York",
    address: "1203 Virginia Ave, Bronx, NY 10472, USA",
    placeId: "ChIJPcdF6MP0wokRNWH2mUgAXlI",
    geo: {
      latitude: 40.830744,
      longitude: -73.860899,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/parkchester-jame-masjid-bronx",
  ids,
};
