// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "e4036b26-a2e9-41fb-b71b-bf5177e5833e",
    name: "Chicago Central Mosque \u0026 Islamic Center",
    url: "http://uama.us/",
    timeZoneId: "America/Chicago",
    address: "3617 W Belle Plaine Ave, Chicago, IL 60618, USA",
    placeId: "ChIJUcpKlL_ND4gRIL3wAguZeJ4",
    geo: {
      latitude: 41.95547980000001,
      longitude: -87.7189229,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/chicago-central-mosqueand-islamic-center-chicago",
  ids,
};
