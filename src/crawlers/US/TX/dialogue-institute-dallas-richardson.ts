import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "55f6dfd2-eba6-465b-9e2e-6903d5ff32d8",
    name: "Dialogue Institute Dallas",
    url: "http://dialoguedallas.org/",
    timeZoneId: "America/Chicago",
    address: "1416 E Collins Blvd, Richardson, TX 75081, USA",
    placeId: "ChIJszcWY90eTIYRjNpyTYiu_DA",
    geo: {
      latitude: 32.9674342,
      longitude: -96.6981503,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/dialogue-institute-dallas-richardson",
  ids,
};
