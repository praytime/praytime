import { createMasjidBoxRun } from "../../../masjidbox";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3e87a273-03d2-453c-b778-465c3323dfc9",
    name: "Masjid Salahadeen",
    url: "http://masjidsalahadeen.org/",
    timeZoneId: "America/Chicago",
    address: "6100 K Ave, Plano, TX 75074, USA",
    geo: {
      latitude: 33.058068,
      longitude: -96.688619,
    },
    placeId: "ChIJO5PKkcAZTIYRTh4L65JMhEs",
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-salahadeen-plano",
  ids,
  run: createMasjidBoxRun(ids, {
    fromUrl: ids[0].url,
    widgetKey: "sMJXRa1ZGN9LX4xLRMS15",
  }),
};
