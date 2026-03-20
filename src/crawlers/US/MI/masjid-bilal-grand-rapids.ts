import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c3e3199d-9710-4c11-9e59-3621413524d0",
    name: "Masjid Bilal",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Bilal&query_place_id=ChIJaQ4IEACtGYgRwldR7wSW1Jo",
    timeZoneId: "America/Detroit",
    address: "1260 Jefferson Ave SE, Grand Rapids, MI 49507, USA",
    placeId: "ChIJaQ4IEACtGYgRwldR7wSW1Jo",
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
