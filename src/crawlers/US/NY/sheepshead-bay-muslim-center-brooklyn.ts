import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0527c5e6-8a21-4be8-b216-51682b739f6f",
    name: "Sheepshead Bay Muslim Center",
    url: "https://sheepshead-bay-muslim-center.business.site/?utm_source\u003Dgmb\u0026utm_medium\u003Dreferral",
    timeZoneId: "America/New_York",
    address: "2812 Voorhies Ave, Brooklyn, NY 11235, USA",
    placeId: "ChIJmYLIvX5EwokR5pYfRJzPfuA",
    geo: {
      latitude: 40.5869834,
      longitude: -73.9408361,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/sheepshead-bay-muslim-center-brooklyn",
  ids,
};
