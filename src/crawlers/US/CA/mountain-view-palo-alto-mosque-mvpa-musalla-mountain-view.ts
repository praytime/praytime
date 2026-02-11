// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "d5e1a5d5-381a-42d1-9f6a-2a797b6eab02",
    name: "Mountain View-Palo Alto Mosque (MVPA Musalla)",
    url: "http://mvpamusalla.org/",
    timeZoneId: "America/Los_Angeles",
    address: "849 Independence Ave, Mountain View, CA 94043, USA",
    placeId: "ChIJS3hwNA-6j4ARYyvN2QHcohU",
    geo: {
      latitude: 37.4164132,
      longitude: -122.0968398,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "h5:last-child");

  util.setTimes(ids[0], a);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/mountain-view-palo-alto-mosque-mvpa-musalla-mountain-view",
  ids,
  run,
};
