import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5cb2a188-77e7-4c9c-927c-8df12175b896",
    name: "Islamic Cultural Center Of Bosniaks",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Cultural+Center+Of+Bosniaks\u0026query_place_id\u003DChIJ80H8PHiS2YkRDOstWRL2N8I",
    timeZoneId: "America/New_York",
    address: "6500 Fremont Rd, East Syracuse, NY 13057, USA",
    placeId: "ChIJ80H8PHiS2YkRDOstWRL2N8I",
    geo: {
      latitude: 43.085906,
      longitude: -76.028463,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-cultural-center-of-bosniaks-east-syracuse",
  ids,
};
