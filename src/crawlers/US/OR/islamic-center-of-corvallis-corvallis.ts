import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "36626062-d475-49c1-bc1b-cc1df53ea69e",
    name: "Islamic Center of Corvallis",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Center+of+Corvallis\u0026query_place_id\u003DChIJ-ffFrJlAwFQRNdGwCGUpv5M",
    timeZoneId: "America/Los_Angeles",
    address: "610 NW Kings Blvd, Corvallis, OR 97330, USA",
    placeId: "ChIJ-ffFrJlAwFQRNdGwCGUpv5M",
    geo: {
      latitude: 44.57392000000001,
      longitude: -123.275476,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/islamic-center-of-corvallis-corvallis",
  ids,
};
