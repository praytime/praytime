import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "52ecb251-6d57-49a1-a6b2-e05fe459bf27",
    name: "Islamic Center of Sioux Falls",
    url: "http://islamiccenterofsiouxfalls.org/",
    timeZoneId: "America/Chicago",
    address: "1909 E 6th St, Sioux Falls, SD 57103, USA",
    placeId: "ChIJl_9Q81O0jocRWnISKr6beqg",
    geo: {
      latitude: 43.5510107,
      longitude: -96.7021977,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/SD/islamic-center-of-sioux-falls-sioux-falls",
  ids,
};
