import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a2760135-638e-40f9-a0cc-1b0409d9fc56",
    name: "Markaz Masjid",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMarkaz+Masjid\u0026query_place_id\u003DChIJvQyYrYEN04kRKwXpwEz04MI",
    timeZoneId: "America/New_York",
    address: "115 Woltz Ave, Buffalo, NY 14212, USA",
    placeId: "ChIJvQyYrYEN04kRKwXpwEz04MI",
    geo: {
      latitude: 42.89716370000001,
      longitude: -78.83504529999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/markaz-masjid-buffalo",
  ids,
};
