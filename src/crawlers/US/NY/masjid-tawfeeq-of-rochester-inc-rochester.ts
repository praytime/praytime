import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ce6b0c74-7362-427d-91b2-9f891479afc0",
    name: "Masjid Tawfeeq of Rochester, Inc",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Tawfeeq+of+Rochester%2C+Inc\u0026query_place_id\u003DChIJRRo0_6211okR6O0tcfTZejc",
    timeZoneId: "America/New_York",
    address: "15 Hudson Ave, Rochester, NY 14605, USA",
    placeId: "ChIJRRo0_6211okR6O0tcfTZejc",
    geo: {
      latitude: 43.1634761,
      longitude: -77.60226399999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-tawfeeq-of-rochester-inc-rochester",
  ids,
};
