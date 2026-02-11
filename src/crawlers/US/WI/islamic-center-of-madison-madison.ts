// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "7ac0e744-d692-4d2f-98f6-66c3beb1ae4a",
    name: "Islamic Center of Madison",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Center+of+Madison\u0026query_place_id\u003DChIJPyYmmM-sB4gRq6ojRg3lMis",
    timeZoneId: "America/Chicago",
    address: "21 N Orchard St, Madison, WI 53715, USA",
    placeId: "ChIJPyYmmM-sB4gRq6ojRg3lMis",
    geo: {
      latitude: 43.06835,
      longitude: -89.40692399999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/islamic-center-of-madison-madison",
  ids,
};
