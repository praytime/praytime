// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "a3870aa1-a206-4d07-b910-a8b1b510ed2e",
    name: "Islamic Center of Brushy Creek (ICBC)",
    url: "http://icbrushycreek.org/",
    timeZoneId: "America/Chicago",
    address: "1950 Brushy Creek Rd, Cedar Park, TX 78613, USA",
    placeId: "ChIJYbTOMDEtW4YRTXizT9pl5u8",
    geo: {
      latitude: 30.5081172,
      longitude: -97.792182,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".pt");
  a.splice(1, 1); // remove sunrise

  const j = util
    .mapToText($, "#plansKRQ .plan h3")
    .filter(util.matchTime)
    .map(util.extractTime);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-brushy-creek-icbc-cedar-park",
  ids,
  run,
};
