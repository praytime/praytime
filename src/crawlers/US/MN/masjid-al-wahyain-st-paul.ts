// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "0506d285-1fc0-4829-b24a-1db874f3018f",
    name: "Masjid Al-Wahyain",
    url: "http://www.masjidalwahyain.com/",
    timeZoneId: "America/Chicago",
    address: "2429 University Ave W, St Paul, MN 55114, USA",
    placeId: "ChIJX_IABLgss1IRx8kOa9TNchg",
    geo: {
      latitude: 44.9647902,
      longitude: -93.1989276,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  $("td.masjidnow-sunrise").remove();

  const a = util.mapToText($, ".masjidnow-salah-time-adhan");

  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-al-wahyain-st-paul",
  ids,
  run,
};
