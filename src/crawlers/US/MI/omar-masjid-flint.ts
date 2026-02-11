// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f7468f35-dad9-43cf-aa70-e90eda9b770a",
    name: "Omar Masjid",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DOmar+Masjid\u0026query_place_id\u003DChIJkcaLmTOdI4gRZ-mz1a_jOeE",
    timeZoneId: "America/Detroit",
    address: "4566 Beecher Rd, Flint, MI 48532, USA",
    placeId: "ChIJkcaLmTOdI4gRZ-mz1a_jOeE",
    geo: {
      latitude: 43.0310851,
      longitude: -83.7649332,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/omar-masjid-flint",
  ids,
};
