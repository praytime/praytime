// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f5550079-5ecf-46b8-a828-c8b22fcdae3a",
    name: "Islamic Association-Masjid A",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Association-Masjid+A\u0026query_place_id\u003DChIJBQrWWnS31okRC1AFwlrLw5A",
    timeZoneId: "America/New_York",
    address: "4550 Lake Ave, Rochester, NY 14612, USA",
    placeId: "ChIJBQrWWnS31okRC1AFwlrLw5A",
    geo: {
      latitude: 43.2535235,
      longitude: -77.61156629999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-association-masjid-a-rochester",
  ids,
};
