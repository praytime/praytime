// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "c2e84391-4f13-462a-979c-9983970ba632",
    name: "Dar-ut-Tawheed",
    url: "http://daruttawheed.com/home/",
    timeZoneId: "America/Chicago",
    address: "6351 N Western Ave, Chicago, IL 60659, USA",
    geo: {
      latitude: 41.997385,
      longitude: -87.689615,
    },
    placeId: "ChIJt1fAD93RD4gRFOgw4kT4P98",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  util.setIqamaTimes(ids[0], util.mapToText($, "table.dptTimetable td.jamah"));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/dar-ut-tawheed-chicago",
  ids,
  run,
};
