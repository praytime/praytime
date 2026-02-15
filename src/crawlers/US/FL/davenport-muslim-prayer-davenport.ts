import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bd0a9214-ddf6-41ba-9bdb-49401752a59b",
    name: "Davenport Muslim Prayer",
    url: "https://davenportprayer.com/",
    timeZoneId: "America/New_York",
    address: "1624 Florida Development Rd, Davenport, FL 33837, USA",
    placeId: "ChIJv06YZIVx3YgRk7ncT2DaVQ4",
    geo: {
      latitude: 28.18719789999999,
      longitude: -81.63003030000002,
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
  name: "US/FL/davenport-muslim-prayer-davenport",
  ids,
  run,
};
