// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d5817222-ab17-4d7f-9225-e57051926a7d",
    name: "Muslim Center of Beloit",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMuslim+Center+of+Beloit\u0026query_place_id\u003DChIJ6anfiMigCIgRbvenjiCDcNA",
    timeZoneId: "America/Chicago",
    address: "1879 Park Ave, Beloit, WI 53511, USA",
    placeId: "ChIJ6anfiMigCIgRbvenjiCDcNA",
    geo: {
      latitude: 42.52491939999999,
      longitude: -89.0262087,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/muslim-center-of-beloit-beloit",
  ids,
};
