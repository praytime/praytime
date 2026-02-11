// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d00fa32e-e0e7-4a3a-a261-afa6574be5f7",
    name: "Muslim Community Center of Tucson",
    url: "http://www.mcctucson.org/",
    timeZoneId: "America/Phoenix",
    address: "5100 N Kevy Pl, Tucson, AZ 85704, USA",
    placeId: "ChIJWUv7Uodz1oYRiRN-mzIenrE",
    geo: {
      latitude: 32.2995125,
      longitude: -110.9978038,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/AZ/muslim-community-center-of-tucson-tucson",
  ids,
};
