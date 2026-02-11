// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "a41239ef-8ca9-4aca-861c-d9ef1625ff5b",
    name: "MCC: Muslim Community Center",
    url: "https://mccbrooklyn.org/",
    timeZoneId: "America/New_York",
    address: "5218 3rd Ave, Brooklyn, NY 11220, USA",
    placeId: "ChIJ-4r4Lq1awokR8tvS-2P7vPo",
    geo: {
      latitude: 40.6463147,
      longitude: -74.01657039999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".dpt_jamah");
  const j = util.mapToText($, ".dpt_start").slice(5).map(util.extractTime);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/mcc-muslim-community-center-brooklyn",
  ids,
  run,
};
