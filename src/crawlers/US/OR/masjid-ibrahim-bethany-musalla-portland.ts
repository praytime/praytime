import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cca4c95b-5cc9-4ed9-80ff-0f14482f43f5",
    name: "Masjid Ibrahim (Bethany Musalla)",
    url: "http://masjid-ibrahim.com/",
    timeZoneId: "America/Los_Angeles",
    address: "15188 NW Central Dr Suite #208, Portland, OR 97229, USA",
    placeId: "ChIJn_o6rKUIlVQRVRMG2yOlVT4",
    geo: {
      latitude: 45.5543061,
      longitude: -122.833198,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/OR/masjid-ibrahim-bethany-musalla-portland",
  ids,
  run: createSelectorRun(ids, {
    iqama: { limit: 5, selector: ".jamah" },
    juma: {
      parser: "matchTimeAmPmG",
      selector: 'b:contains("Jumah")',
    },
  }),
};
