import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "683d52ff-1c18-427a-8dfd-ce903dd7ff32",
    name: "Islamic Society of Bay Ridge",
    url: "http://www.isbr.net/",
    timeZoneId: "America/New_York",
    address: "6807 5th Ave a1, Brooklyn, NY 11220, USA",
    placeId: "ChIJjUxQV1BFwokRSgueFLDVZF8",
    geo: {
      latitude: 40.6338096,
      longitude: -74.02070499999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-society-of-bay-ridge",
  ids,
};
