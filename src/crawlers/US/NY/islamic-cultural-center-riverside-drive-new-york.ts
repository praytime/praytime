import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "193f57e0-cab5-43a2-bb9f-e87ccd292ce5",
    name: "Islamic Cultural Center Riverside Drive",
    url: "https://icc-ny.us/",
    timeZoneId: "America/New_York",
    address: "1 Riverside Dr, New York, NY 10023, USA",
    placeId: "ChIJsxvZLmJYwokRAMsZaNGZzXU",
    geo: {
      latitude: 40.7804337,
      longitude: -73.98527229999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/islamic-cultural-center-riverside-drive-new-york",
  ids,
  run: createSelectorRun(ids, {
    iqama: { limit: 5, selector: ".jamah" },
    juma: {
      parser: "matchTimeAmPmG",
      selector: 'li:contains("Kutbah")',
    },
  }),
};
