import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c3e3199d-9710-4c11-9e59-3621413524d0",
    name: "Masjid Bilal",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Bilal\u0026query_place_id\u003DChIJ4_tCCRGtGYgRpvjPKjY_ykU",
    timeZoneId: "America/Detroit",
    address: "1260 Jefferson Ave SE, Grand Rapids, MI 49507, USA",
    placeId: "ChIJ4_tCCRGtGYgRpvjPKjY_ykU",
    geo: {
      latitude: 42.9396959,
      longitude: -85.6633493,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-bilal-grand-rapids",
  ids,
};
