import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2c72fd16-caa0-47a2-8e02-93fbc9eb6995",
    name: "Islamic Center of Peoria",
    url: "https://www.icpeoria.org/",
    timeZoneId: "America/Chicago",
    address: "4125 W Charter Oak Rd, Peoria, IL 61615, USA",
    placeId: "ChIJpT84UP9cCogRJ6qJIEz6AuM",
    geo: {
      latitude: 40.75645669999999,
      longitude: -89.6585892,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");

  util.setTimes(ids[0], a);

  if (util.isJumaToday(ids[0])) {
    util.setJumaTimes(ids[0], [a[1]]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-peoria-peoria",
  ids,
  run,
};
