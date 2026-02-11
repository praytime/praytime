// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "9df40951-479d-4785-8696-3b2cae6e710c",
    name: "Islamic Center of Greater Cincinnati (ICGC)",
    url: "https://www.icgc.us/",
    timeZoneId: "America/New_York",
    address: "8092 Plantation Dr, West Chester Township, OH 45069, USA",
    placeId: "ChIJv0lw7pxQQIgRcfsQIihsiRg",
    geo: {
      latitude: 39.3480842,
      longitude: -84.3851191,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OH/islamic-center-of-greater-cincinnati-icgc-west-chester-township",
  ids,
};
