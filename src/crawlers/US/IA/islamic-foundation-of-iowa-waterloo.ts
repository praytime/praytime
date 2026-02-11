// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "5717a21d-43d3-48f2-9c00-ac025646dbcb",
    name: "Islamic Foundation of Iowa",
    url: "http://www.ifiowa.net/",
    timeZoneId: "America/Chicago",
    address:
      "Islamic Foundation of Iowa, 330 South St, Waterloo, IA 50701, USA",
    placeId: "ChIJb2X57gNT5YcRfNDNerHQTgE",
    geo: {
      latitude: 42.4934956,
      longitude: -92.3461256,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IA/islamic-foundation-of-iowa-waterloo",
  ids,
};
