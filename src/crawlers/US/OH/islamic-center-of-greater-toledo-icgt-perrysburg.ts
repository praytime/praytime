// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "a9b2c271-da75-4dcb-955c-2da6bac8e383",
    name: "Islamic Center of Greater Toledo (ICGT)",
    url: "http://icgt.org/",
    timeZoneId: "America/New_York",
    address: "25877 Scheider Rd, Perrysburg, OH 43551, USA",
    placeId: "ChIJCaidWUF2PIgRpBoHb2uwngA",
    geo: {
      latitude: 41.528148,
      longitude: -83.6186,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OH/islamic-center-of-greater-toledo-icgt-perrysburg",
  ids,
};
