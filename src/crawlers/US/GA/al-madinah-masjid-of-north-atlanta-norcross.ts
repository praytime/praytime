import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3154a91f-911e-4923-92ca-65d9b5b0dc82",
    name: "Al-Madinah Masjid of North Atlanta",
    url: "http://www.almadinahatl.org/",
    timeZoneId: "America/New_York",
    address: "6014 Goshen Springs Rd, Norcross, GA 30071, USA",
    placeId: "ChIJTVAR2rmm9YgR99-QgWUk3Mk",
    geo: {
      latitude: 33.916002,
      longitude: -84.20537580000001,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  if (util.isJumaToday(ids[0])) {
    const a = util.mapToText($, ".jamah");
    util.setIqamaTimes(ids[0], a);
    util.setJumaTimes(ids[0], [a[1]]);
  } else {
    const a = util.mapToText($, ".dptTimetable td:last-child");
    a.splice(1, 1); // remove sunrise
    util.setJumaTimes(ids[0], util.matchTimeG(a[5]));
    util.setIqamaTimes(ids[0], a);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/GA/al-madinah-masjid-of-north-atlanta-norcross",
  ids,
  run,
};
