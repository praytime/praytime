import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fbc82150-2098-4217-930a-0f3093cdd3a3",
    name: "Islamic Center of Virginia",
    url: "https://icva.info/",
    timeZoneId: "America/New_York",
    address: "1241 Buford Rd, North Chesterfield, VA 23235, USA",
    placeId: "ChIJrxOo384SsYkRSfw0fHaQkfI",
    geo: {
      latitude: 37.5151549,
      longitude: -77.5534873,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/VA/islamic-center-of-virginia-bon-air",
  ids,
  run: createMasjidalRun(ids, "M9L2wzAZ"),
};
