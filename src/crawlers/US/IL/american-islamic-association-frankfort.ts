import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f92486e8-f93d-456e-b1e6-1c99ddce160d",
    name: "American Islamic Association",
    url: "http://www.aiamasjid.org/",
    timeZoneId: "America/Chicago",
    address: "8860 W Saint Francis Rd, Frankfort, IL 60423, USA",
    placeId: "ChIJr3oCQOsUDogRFCmODcj5CXc",
    geo: {
      latitude: 41.522716,
      longitude: -87.832695,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/american-islamic-association-frankfort",
  ids,
  run: createMasjidalRun(ids, "VGA6grde", { jumaCount: 2 }),
};
