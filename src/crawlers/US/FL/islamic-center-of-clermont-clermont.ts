import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3ad8bf17-4801-44ef-9c8f-e287347aabdf",
    name: "Islamic Center of Clermont",
    url: "http://icoc.life/",
    timeZoneId: "America/New_York",
    address: "15020 Johns Lake Rd, Clermont, FL 34711, USA",
    placeId: "ChIJJVpo_ESP54gRxqMGuWd3b-U",
    geo: {
      latitude: 28.5238571,
      longitude: -81.70635220000001,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-clermont-clermont",
  ids,
};
