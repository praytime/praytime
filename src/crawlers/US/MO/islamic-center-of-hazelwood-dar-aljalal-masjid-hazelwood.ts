// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "5874495c-7d84-4816-8049-eb50b3579d26",
    name: "Islamic Center of Hazelwood Dar Aljalal Masjid",
    url: "http://www.daraljalal.com/",
    timeZoneId: "America/Chicago",
    address: "8945 Dunn Rd, Hazelwood, MO 63042, USA",
    placeId: "ChIJpQ22Tf0234cRuZDj-MYzCLI",
    geo: {
      latitude: 38.77731089999999,
      longitude: -90.3463771,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  if (util.isJumaToday(ids[0])) {
    const a = util.mapToText($, ".jamah");
    util.setIqamaTimes(ids[0], a);
    util.setJumaTimes(ids[0], ["check website"]);
  } else {
    const a = util.mapToText($, ".dptTimetable td:last-child");
    a.splice(1, 1); // remove sunrise
    util.setJumaTimes(ids[0], util.matchTimeAmPmG(a[5]));
    util.setIqamaTimes(ids[0], a);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MO/islamic-center-of-hazelwood-dar-aljalal-masjid-hazelwood",
  ids,
  run,
};
