// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "56694533-c7f4-450f-921f-ec50be11a691",
    name: "Ethiopian Muslims Assocation of Seattle",
    url: "http://www.emasseattle.org/",
    timeZoneId: "America/Los_Angeles",
    address: "3730 S 166th St, SeaTac, WA 98188, USA",
    geo: {
      latitude: 47.455067,
      longitude: -122.284984,
    },
    placeId: "ChIJCeZl3UpDkFQRuLd31_Ik9z0",
  },
];
const run = async () => {
  const $ = await util.load("https://solah.org/");

  const a = util.mapToText($, "table tbody td:last-child");

  a.splice(1, 1); // remove sunrise
  a.splice(5, 1); // remove juma heading

  util.setTimes(ids[0], a.slice(0, 6));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/emas-seattle",
  ids,
  run,
};
