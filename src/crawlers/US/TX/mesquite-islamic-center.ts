import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aaa62010-ee7a-480a-9afc-81fddbd920c9",
    name: "Mesquite Islamic Center",
    url: "http://www.micmasjid.com/",
    address: "2419 Franklin Dr, Mesquite, TX 75150, USA",
    geo: {
      latitude: 32.796505,
      longitude: -96.61794,
    },
    placeId: "ChIJBfo8m8ulToYR9ohwTEuA7Dw",
    timeZoneId: "America/Chicago",
  },
];
const CHECK_WEBSITE_TIMES = [
  "check website",
  "check website",
  "check website",
  "check website",
  "check website",
  "check website",
  "check website",
];

const run = async () => {
  // MIC currently publishes prayer times as uploaded calendar images only.
  util.setTimes(ids[0], CHECK_WEBSITE_TIMES);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/mesquite-islamic-center",
  ids,
  run,
};
