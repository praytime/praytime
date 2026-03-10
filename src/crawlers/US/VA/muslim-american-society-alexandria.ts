import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9b86cead-4bae-4619-b335-180ee2a6ed78",
    name: "Muslim American Society",
    url: "https://masdc.org/",
    timeZoneId: "America/New_York",
    address: "6408 Edsall Rd, Alexandria, VA 22312, USA",
    placeId: "ChIJl2nIW_Cyt4kRQHNIy86vKnc",
    geo: {
      latitude: 38.80509,
      longitude: -77.1577497,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/VA/muslim-american-society-alexandria",
  ids,
  run: createMasjidalRun(ids, "YRKxVOAO", { jumaCount: 2 }),
};
