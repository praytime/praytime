// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "15c13121-0e51-4b1a-9442-ef5b8ce0fe7f",
    name: "Council of Somali Imams",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DCouncil+of+Somali+Imams\u0026query_place_id\u003DChIJ3XjqrFAts1IRC7uyDhiYW_s",
    timeZoneId: "America/Chicago",
    address: "1433 E Franklin Ave, Minneapolis, MN 55404, USA",
    placeId: "ChIJ3XjqrFAts1IRC7uyDhiYW_s",
    geo: {
      latitude: 44.962306,
      longitude: -93.25375,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/council-of-somali-imams-minneapolis",
  ids,
};
