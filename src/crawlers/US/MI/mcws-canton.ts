// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "6967897e-bb45-46a7-bae0-9221659e6b0f",
    name: "MCWS",
    url: "http://www.mcws.org/",
    timeZoneId: "America/Detroit",
    address: "40440 Palmer Rd, Canton, MI 48188, USA",
    placeId: "ChIJwWh_XhdSO4gRvqp8RSRYyTo",
    geo: {
      latitude: 42.29512709999999,
      longitude: -83.4389788,
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
  name: "US/MI/mcws-canton",
  ids,
  run,
};
