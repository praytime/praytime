import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e33ad2e4-6986-43c6-87ee-e566eaa906a0",
    name: "Islamic Center of Northern Virginia",
    url: "http://icnvt.com/",
    address: "4420 Shirley Gate Rd, Fairfax, VA 22030, USA",
    placeId: "ChIJW9VHHAVPtokRpLC4ENiNUwQ",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 38.845966,
      longitude: -77.341281,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/VA/islamic-center-of-northern-virginia",
  ids,
  run: createMawaqitMobileRun(ids, "icnvt"),
};
