import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
const run = async () => {
  const iqama = await util.loadMasjidalIqama("M9L2wzAZ");
  util.setTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
    iqama.jummah1,
    iqama.jummah2,
    iqama.jummah3,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/islamic-center-of-virginia-bon-air",
  ids,
  run,
};
