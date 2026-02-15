import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6b863045-a88e-4f8d-9ac8-545d0f2462f7",
    name: "Masjid Al-Ihsaan",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Al-Ihsaan\u0026query_place_id\u003DChIJlcYYN8mDI4gRMj5Oz4Um7HY",
    timeZoneId: "America/Detroit",
    address: "3401 Saginaw St, Flint, MI 48505, USA",
    placeId: "ChIJlcYYN8mDI4gRMj5Oz4Um7HY",
    geo: {
      latitude: 43.04641069999999,
      longitude: -83.6943446,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-al-ihsaan-flint",
  ids,
};
