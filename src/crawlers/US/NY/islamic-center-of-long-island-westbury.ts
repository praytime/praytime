import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0c353527-0231-4d29-87fd-25b5496232e3",
    name: "Islamic Center of Long Island",
    url: "https://icliny.org/prayer-times/",
    timeZoneId: "America/New_York",
    address: "835 Brush Hollow Rd, Westbury, NY 11590, USA",
    placeId: "ChIJ3-009i-HwokRQIUfFmauBxQ",
    geo: {
      latitude: 40.7657089,
      longitude: -73.5707169,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-center-of-long-island-westbury",
  ids,
};
