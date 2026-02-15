import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ae13b1b4-52f4-4d30-9986-eb8cfc1b0662",
    name: "Islamic Center Of Blaine",
    url: "http://islamiccenterblaine.com/",
    timeZoneId: "America/Los_Angeles",
    address: "495 Cherry St, Blaine, WA 98230, USA",
    placeId: "ChIJMUgogVPBhVQRjdMPsYW8Ec8",
    geo: {
      latitude: 48.9893776,
      longitude: -122.7468326,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-blaine-blaine",
  ids,
};
