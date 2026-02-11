// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "04382a38-b718-4576-8647-e496a9c52cff",
    name: "Darul Huda",
    url: "https://darulhudausa.org/",
    address: "6666 Commerce St, Springfield, VA 22150, USA",
    placeId: "ChIJB3xk3aCyt4kRsfPHQUkEXgk",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 38.779942,
      longitude: -77.175792,
    },
  },
];
const run = async () => {
  util.setTimes(ids[0], [
    "check website",
    "check website",
    "check website",
    "check website",
    "check website",
    "check website",
    "check website",
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/darul-huda-springfield",
  ids,
  run,
};
