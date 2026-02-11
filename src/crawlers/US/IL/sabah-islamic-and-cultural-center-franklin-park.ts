// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "80f21056-1846-4ea7-93c7-00364e0706c1",
    name: "SABAH Islamic and Cultural Center",
    url: "http://www.sabahchicago.com/",
    timeZoneId: "America/Chicago",
    address: "9920 Grand Ave, Franklin Park, IL 60131, USA",
    placeId: "ChIJeWhim3K1D4gRmKAEbPmjrtw",
    geo: {
      latitude: 41.9300873,
      longitude: -87.8728768,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/sabah-islamic-and-cultural-center-franklin-park",
  ids,
};
