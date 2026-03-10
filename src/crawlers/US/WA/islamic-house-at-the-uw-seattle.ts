import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8229b177-d40f-49c6-9106-089c2d3e633b",
    name: "Islamic House at the UW",
    url: "https://msauw.org/islamic-house/",
    timeZoneId: "America/Los_Angeles",
    address: "4625 22nd Ave NE, Seattle, WA 98105, USA",
    placeId: "ChIJVwLeFokUkFQRo2ebvW3-m8w",
    geo: {
      latitude: 47.6626257,
      longitude: -122.3046751,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/islamic-house-at-the-uw-seattle",
  ids,
  run: createSelectorRun(ids, {
    iqama: { limit: 5, selector: ".jamah" },
    juma: {
      parser: "extractTimeAmPm",
      selector: 'h2:contains("Jummah")',
    },
  }),
};
