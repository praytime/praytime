import { createFridayAwareJamahRun } from "../../../jamah";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f4f1d6f6-8f60-435a-97ba-35bec83e09a0",
    name: "Tawheed Center",
    url: "http://tawheedcenter.org/",
    timeZoneId: "America/Detroit",
    address: "29707 W 10 Mile Rd, Farmington, MI 48336, USA",
    placeId: "ChIJW4L6DiyxJIgRMYh0hvAdQiA",
    geo: {
      latitude: 42.469918,
      longitude: -83.340744,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/tawheed-center-farmington",
  ids,
  run: createFridayAwareJamahRun(ids, {
    nonFridayJumaParser: "matchTimeAmPmG",
  }),
};
