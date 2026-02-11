// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "1df81155-3b58-4183-924a-f5233e356c84",
    name: "Masjid al-Taqwa",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+al-Taqwa\u0026query_place_id\u003DChIJtTsJVtdqkFQRBO7qEYz0nFk",
    timeZoneId: "America/Los_Angeles",
    address: "720 25th Ave, Seattle, WA 98122, USA",
    placeId: "ChIJtTsJVtdqkFQRBO7qEYz0nFk",
    geo: {
      latitude: 47.6086919,
      longitude: -122.2998613,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/masjid-al-taqwa-seattle",
  ids,
};
