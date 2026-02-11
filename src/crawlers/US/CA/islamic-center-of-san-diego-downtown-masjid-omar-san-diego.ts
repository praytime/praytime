// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "e2392484-1b04-4e32-a971-e6c2a9f92d0f",
    name: "Islamic Center Of San Diego Downtown (Masjid Omar)",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Center+Of+San+Diego+Downtown+%28Masjid+Omar%29\u0026query_place_id\u003DChIJPWEP1lFT2YARnEjCsipr4Z8",
    timeZoneId: "America/Los_Angeles",
    address: "3487 Ocean View Blvd, San Diego, CA 92113, USA",
    placeId: "ChIJPWEP1lFT2YARnEjCsipr4Z8",
    geo: {
      latitude: 32.7010373,
      longitude: -117.1190989,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-san-diego-downtown-masjid-omar-san-diego",
  ids,
};
