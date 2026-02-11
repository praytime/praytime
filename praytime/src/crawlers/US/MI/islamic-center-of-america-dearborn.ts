// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "758f9ff9-22e0-425a-ace8-2bb35cb4fe40",
    name: "Islamic Center of America",
    url: "http://www.icofa.com/",
    timeZoneId: "America/Detroit",
    address: "19500 Ford Rd, Dearborn, MI 48128, USA",
    placeId: "ChIJG5fwsS_LJIgRGFeNuYe7fVE",
    geo: {
      latitude: 42.3303719,
      longitude: -83.22981519999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-america-dearborn",
  ids,
};
