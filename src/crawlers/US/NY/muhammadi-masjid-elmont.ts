// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "c537cfbd-071a-4ba1-b477-a711da89d5ac",
    name: "Muhammadi Masjid",
    url: "http://muhammadimasjid.org/",
    timeZoneId: "America/New_York",
    address: "681 Elmont Rd, Elmont, NY 11003, USA",
    placeId: "ChIJjUVmH75jwokRWdR9sL-Fm5I",
    geo: {
      latitude: 40.6930649,
      longitude: -73.7180645,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayer-list button");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/muhammadi-masjid-elmont",
  ids,
  run,
};
