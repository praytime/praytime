// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "4f16f351-a56f-4a8a-a1a7-d546c9a4c5a2",
    name: "WBICC",
    url: "http://www.wbicc.org/",
    timeZoneId: "America/Chicago",
    address: "2944 N Narragansett Ave, Chicago, IL 60634, USA",
    placeId: "ChIJW6494XnLD4gRQO7sCru-jOw",
    geo: {
      latitude: 41.9341163,
      longitude: -87.7860743,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/wbicc-chicago",
  ids,
};
