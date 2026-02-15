import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "345adc38-70d7-4d94-8d87-3c7e9ec8d5f6",
    name: "Bosnian Islamic Cultural Center of Erie",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DBosnian+Islamic+Cultural+Center+of+Erie\u0026query_place_id\u003DChIJd3De9QmAMogRrCiZ3W_9Wiw",
    timeZoneId: "America/New_York",
    address: "1001 W 21st St, Erie, PA 16502, USA",
    placeId: "ChIJd3De9QmAMogRrCiZ3W_9Wiw",
    geo: {
      latitude: 42.1081694,
      longitude: -80.0971201,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/bosnian-islamic-cultural-center-of-erie-erie",
  ids,
};
