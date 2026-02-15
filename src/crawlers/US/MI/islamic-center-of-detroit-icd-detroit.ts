import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3dab4e4f-2687-4756-af57-c99377c2b63b",
    name: "Islamic Center of Detroit - ICD",
    url: "http://icdonline.org/",
    timeZoneId: "America/Detroit",
    address: "14350 Tireman Ave, Detroit, MI 48228, USA",
    placeId: "ChIJSVj4S0rLJIgRUcjBpixk2P4",
    geo: {
      latitude: 42.35192319999999,
      longitude: -83.18380549999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-detroit-icd-detroit",
  ids,
};
