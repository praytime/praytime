// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "431f6e2e-5363-43c4-9dbb-2b9b2a47db7f",
    name: "Leesburg Islamic Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DLeesburg+Islamic+Center\u0026query_place_id\u003DChIJueVNlDrA54gRAywNCIPK_Mw",
    timeZoneId: "America/New_York",
    address: "2201 Montclair Rd, Leesburg, FL 34748, USA",
    placeId: "ChIJueVNlDrA54gRAywNCIPK_Mw",
    geo: {
      latitude: 28.8158948,
      longitude: -81.89775999999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/leesburg-islamic-center-leesburg",
  ids,
};
