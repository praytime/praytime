import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a920e646-6dba-4a3b-9d58-f4b6473e9559",
    name: "Madina Institute",
    url: "http://www.madinainstitute.com/us-atl",
    timeZoneId: "America/New_York",
    address: "3580 Sweetwater Rd, Duluth, GA 30096, USA",
    placeId: "ChIJV-F8KECj9YgRcgrEW5AnLIs",
    geo: {
      latitude: 33.944238,
      longitude: -84.12219759999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".masjidnow-salah-time-iqamah");
  a[3] = "-";
  const [j] = util
    .mapToText($, ".masjidnow-monthly-info")
    .map(util.matchTimeAmPmG);

  util.setIqamaTimes(ids[0], a);
  if (j?.length) {
    util.setJumaTimes(ids[0], j);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/GA/madina-institute-duluth",
  ids,
  run,
};
