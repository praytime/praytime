// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
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
  name: "US/TX/mesquite-islamic-center",
  ids,
  run,
};
