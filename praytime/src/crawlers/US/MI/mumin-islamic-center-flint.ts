// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "bfafcb91-8222-4b64-8b09-342613b434ce",
    name: "Mumin Islamic Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMumin+Islamic+Center\u0026query_place_id\u003DChIJBZo_2WyDI4gRMgBAV89sPE0",
    timeZoneId: "America/Detroit",
    address: "4043 Clio Rd, Flint, MI 48504, USA",
    placeId: "ChIJBZo_2WyDI4gRMgBAV89sPE0",
    geo: {
      latitude: 43.0617702,
      longitude: -83.7337673,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/mumin-islamic-center-flint",
  ids,
};
