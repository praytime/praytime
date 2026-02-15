import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a41cbb17-fde7-4e3a-bee8-07428a792495",
    name: "Khalid Binu Walid Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DKhalid+Binu+Walid+Center\u0026query_place_id\u003DChIJVUC5eIsn9ocRdHLefxqUDC0",
    timeZoneId: "America/Chicago",
    address: "124 W Lake St, Minneapolis, MN 55408, USA",
    placeId: "ChIJVUC5eIsn9ocRdHLefxqUDC0",
    geo: {
      latitude: 44.9486843,
      longitude: -93.28093469999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/khalid-binu-walid-center-minneapolis",
  ids,
};
