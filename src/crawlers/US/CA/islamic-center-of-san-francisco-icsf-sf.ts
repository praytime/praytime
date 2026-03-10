import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "122cfd1e-b3a6-4ba6-a909-a874093573b4",
    name: "Islamic Center of San Francisco (ICSF)",
    url: "http://icofsf.org/",
    timeZoneId: "America/Los_Angeles",
    address: "400 Crescent Ave, San Francisco, CA 94110, USA",
    placeId: "ChIJT1HSIPZ-j4AR9ady0fVgy9Y",
    geo: {
      latitude: 37.7347456,
      longitude: -122.4167193,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-san-francisco-icsf-sf",
  ids,
  run: createMasjidalRun(ids, "nzKz7bLO", { jumaCount: 2 }),
};
