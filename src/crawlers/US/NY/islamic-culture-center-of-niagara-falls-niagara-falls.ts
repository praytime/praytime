import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3f8c9f3a-41ed-4ff9-b599-6a169c813e8b",
    name: "Islamic Culture Center of Niagara Falls",
    url: "http://www.iccnf.com/",
    timeZoneId: "America/New_York",
    address: "2843 Niagara Falls Blvd, Niagara Falls, NY 14304, USA",
    placeId: "ChIJgyGZQnpv04kRSd99uccpyqg",
    geo: {
      latitude: 43.0884939,
      longitude: -78.8906629,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-culture-center-of-niagara-falls-niagara-falls",
  ids,
};
