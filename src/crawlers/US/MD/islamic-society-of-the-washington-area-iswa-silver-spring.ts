import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7e4f866b-b907-47bc-94f4-415ed67c10fd",
    name: "Islamic Society of the Washington Area (ISWA)",
    url: "http://www.iswamd.org/",
    timeZoneId: "America/New_York",
    address: "2701 Briggs Chaney Rd, Silver Spring, MD 20905, USA",
    placeId: "ChIJR2wC8C3bt4kRdti25mHS4os",
    geo: {
      latitude: 39.0858333,
      longitude: -76.95472219999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MD/islamic-society-of-the-washington-area-iswa-silver-spring",
  ids,
};
