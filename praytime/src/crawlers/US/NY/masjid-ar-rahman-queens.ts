// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d02c53bd-1e55-4626-82c9-e774f5a23c67",
    name: "Masjid Ar-Rahman",
    url: "https://www.masjidarrahmanny.org/",
    timeZoneId: "America/New_York",
    address: "98-10 211th St, Queens Village, NY 11429, USA",
    placeId: "ChIJISzVdX1hwokRA6s1TNY9wBo",
    geo: {
      latitude: 40.71399239999999,
      longitude: -73.7491877,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-ar-rahman-queens",
  ids,
};
