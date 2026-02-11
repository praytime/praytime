// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "0befcf83-59cd-4a58-8ca3-f222f8c8ad7c",
    name: "Hamza Community Services",
    url: "https://www.masjidhamzasandiego.com/",
    timeZoneId: "America/Los_Angeles",
    address: "9400 Activity Rd Suite I, San Diego, CA 92126, USA",
    placeId: "ChIJQadnz0r524ARYqAgCo9ICvM",
    geo: {
      latitude: 32.8974591,
      longitude: -117.1249449,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = ["Fajr", "Dhuhr", "Asr", "Isha", "Jumah"]
    .map((s) => util.toText($, `h2:contains("${s}")`))
    .map(util.extractTimeAmPm);

  a.splice(3, 0, "-"); // insert maghrib

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/hamza-community-services-san-diego",
  ids,
  run,
};
