import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "76feca79-7b47-486d-a5b9-dcb4d8b8f26a",
    name: "Manassass Muslim Association",
    url: "http://www.manassasmuslims.org/",
    timeZoneId: "America/New_York",
    address: "9059 Euclid Ave, Manassas, VA 20110, USA",
    placeId: "ChIJDVq7WZlbtokR-xO78Y00IN0",
    geo: {
      latitude: 38.76095499999999,
      longitude: -77.452361,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/VA/manassass-muslim-association-manassas",
  ids,
  run: createMawaqitMobileRun(ids, "mma"),
};
