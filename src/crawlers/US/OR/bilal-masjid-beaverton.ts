import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ebc421c8-5dc4-48f1-a896-660f1979e922",
    name: "Bilal Masjid",
    url: "http://www.bilalmasjid.com/",
    timeZoneId: "America/Los_Angeles",
    address: "4115 SW 160th Ave, Beaverton, OR 97007, USA",
    placeId: "ChIJ1zBAhokOlVQR2TdaCbFyL9k",
    geo: {
      latitude: 45.490128,
      longitude: -122.842614,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/OR/bilal-masjid-beaverton",
  ids,
  run: createSelectorRun(ids, {
    iqama: { selector: "span[id$=Iqama]" },
    juma: {
      parser: "matchTimeAmPmG",
      selector: "span[id$=JummahTime]",
    },
  }),
};
