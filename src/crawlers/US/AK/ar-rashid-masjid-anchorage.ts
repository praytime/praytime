import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fa598138-8bd5-4fc3-951e-eac72a4c0b35",
    name: "Ar-Rashid Masjid",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DAr-Rashid+Masjid\u0026query_place_id\u003DChIJ0V_TRoyXyFYRmk0v9iJcdQQ",
    timeZoneId: "America/Anchorage",
    address: "5841 Arctic Blvd STE 203, Anchorage, AK 99518, USA",
    placeId: "ChIJ0V_TRoyXyFYRmk0v9iJcdQQ",
    geo: {
      latitude: 61.1680475,
      longitude: -149.8973024,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/AK/ar-rashid-masjid-anchorage",
  ids,
};
