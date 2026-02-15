import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8b4a2128-1515-42ec-9456-a7bd5c56d1d8",
    name: "Islamic Cultural Centre of Valleyfield",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Cultural+Centre+of+Valleyfield\u0026query_place_id\u003DChIJtSYiRi9OyUwRfA0JEr8IAt0",
    timeZoneId: "America/Toronto",
    address: "47 Rue du Marché, Salaberry-de-Valleyfield, QC J6T 1P3, Canada",
    placeId: "ChIJtSYiRi9OyUwRfA0JEr8IAt0",
    geo: {
      latitude: 45.2543221,
      longitude: -74.1336695,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/QC/islamic-cultural-centre-of-valleyfield-salaberry-de-valleyfield",
  ids,
};
