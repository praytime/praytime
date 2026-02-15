import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f366a39b-b170-402e-9117-2abdd42cbd7d",
    name: "Islamic Society of Southwest Washington",
    url: "http://www.issww.com/",
    timeZoneId: "America/Los_Angeles",
    address: "1000 NE 66th St, Vancouver, WA 98665, USA",
    placeId: "ChIJvwyvlO-ulVQRNYiABWFZeGY",
    geo: {
      latitude: 45.67050210000001,
      longitude: -122.6616818,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-society-of-southwest-washington-vancouver",
  ids,
};
