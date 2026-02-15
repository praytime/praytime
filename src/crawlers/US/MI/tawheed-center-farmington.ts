import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");

  if (util.isJumaToday(ids[0])) {
    const j = util.matchTimeAmPmG(a[1]);
    util.setJumaTimes(ids[0], j);
    a[1] = "Juma";
  } else {
    const j = a.slice(-1).flatMap(util.matchTimeAmPmG);
    util.setJumaTimes(ids[0], j);
  }

  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/tawheed-center-farmington",
  ids,
  run,
};
