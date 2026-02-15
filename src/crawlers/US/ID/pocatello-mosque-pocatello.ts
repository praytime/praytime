import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5879a96a-00a4-4e4b-82e6-479546b89592",
    name: "Pocatello Mosque",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DPocatello+Mosque\u0026query_place_id\u003DChIJ7fyQdt5OVVMR97A3haLSFRs",
    timeZoneId: "America/Boise",
    address: "1513 S 5th Ave, Pocatello, ID 83201, USA",
    placeId: "ChIJ7fyQdt5OVVMR97A3haLSFRs",
    geo: {
      latitude: 42.855374,
      longitude: -112.4320287,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ID/pocatello-mosque-pocatello",
  ids,
};
