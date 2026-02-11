// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "a98c592c-f91b-4989-83ba-2d417bd604b9",
    name: "Dar Omar Al-Farooq",
    url: "http://daromaralfarooq.org/",
    timeZoneId: "America/Chicago",
    address: "983 17th Ave SE, Minneapolis, MN 55414, USA",
    placeId: "ChIJ04b-ggYts1IR10WC4Xa5vCg",
    geo: {
      latitude: 44.98727299999999,
      longitude: -93.228872,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/dar-omar-al-farooq-minneapolis",
  ids,
};
