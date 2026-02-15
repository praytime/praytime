import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d163d5bb-f40e-4ea9-a68d-b28d96b5dac0",
    name: "Islamic Cultural Center-Greater Chicago",
    url: "http://www.iccgreaterchicago.com/",
    timeZoneId: "America/Chicago",
    address: "1800 Pfingsten Rd, Northbrook, IL 60062, USA",
    placeId: "ChIJJ5KsSlzHD4gRp_DIN0LSqsI",
    geo: {
      latitude: 42.11989320000001,
      longitude: -87.84926039999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-cultural-center-greater-chicago-northbrook",
  ids,
};
