// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "bbec1fba-5c85-4a16-abe5-50a67ec946d6",
    name: "Florida Islamic Center",
    url: "http://www.floridaislamiccenter.org/",
    timeZoneId: "America/New_York",
    address: "60 W Center St, Minneola, FL 34715, USA",
    placeId: "ChIJXzrM4FqO54gRYQQnOs1h9hc",
    geo: {
      latitude: 28.5722715,
      longitude: -81.74731469999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/florida-islamic-center-minneola",
  ids,
};
