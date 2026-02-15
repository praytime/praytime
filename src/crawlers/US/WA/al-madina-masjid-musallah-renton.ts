import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6104b065-c9d8-4e7a-8284-d0f1c06fa829",
    name: "Al-Madina Masjid (Musallah)",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DAl-Madina+Masjid+%28Musallah%29\u0026query_place_id\u003DChIJeSeBYzlDkFQR_hgQSXcpzVM",
    timeZoneId: "America/Los_Angeles",
    address: "81 S Tobin St, Renton, WA 98057, USA",
    placeId: "ChIJeSeBYzlDkFQR_hgQSXcpzVM",
    geo: {
      latitude: 47.4836766,
      longitude: -122.2165617,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/al-madina-masjid-musallah-renton",
  ids,
};
