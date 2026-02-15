import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4d964f4e-1398-4920-b5ee-17628272ceda",
    name: "BIAW",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DBIAW\u0026query_place_id\u003DChIJOQ38in1P5YcRS1gdj9__Dr4",
    timeZoneId: "America/Chicago",
    address: "3423 Kennedy Ln, Waterloo, IA 50701, USA",
    placeId: "ChIJOQ38in1P5YcRS1gdj9__Dr4",
    geo: {
      latitude: 42.4336594,
      longitude: -92.2918236,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IA/biaw-waterloo",
  ids,
};
