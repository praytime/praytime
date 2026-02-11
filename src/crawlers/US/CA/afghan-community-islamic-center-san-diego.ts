// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "1f34f77c-bf42-4832-a371-3566b33e7889",
    name: "Afghan Community Islamic Center",
    url: "http://acicmasjidtawheed.com/",
    timeZoneId: "America/Los_Angeles",
    address: "3333 Sandrock Rd, San Diego, CA 92123, USA",
    placeId: "ChIJ52-wp2JV2YARuI8QpOnaCIY",
    geo: {
      latitude: 32.8034722,
      longitude: -117.1389556,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "td:first-child").filter(util.matchTimeAmPm);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/afghan-community-islamic-center-san-diego",
  ids,
  run,
};
