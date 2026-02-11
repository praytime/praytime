// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ec7a6c6d-dc73-428e-af6f-b0ca15cb8172",
    name: "Beit El-Maqdis Islamic Center",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DBeit+El-Maqdis+Islamic+Center\u0026query_place_id\u003DChIJ9Wnt0U1FwokR5gvn8mpv3G4",
    timeZoneId: "America/New_York",
    address: "6206 6th Ave, Brooklyn, NY 11220, USA",
    placeId: "ChIJ9Wnt0U1FwokR5gvn8mpv3G4",
    geo: {
      latitude: 40.6366461,
      longitude: -74.0157339,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/beit-el-maqdis-islamic-center-brooklyn",
  ids,
};
