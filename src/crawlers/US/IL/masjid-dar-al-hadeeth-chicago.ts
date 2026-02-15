import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "718b2f2e-4e79-4e85-9774-cf7cd56a9e47",
    name: "Masjid Dar Al-Hadeeth",
    url: "https://masjiddaralhadeeth.com/",
    timeZoneId: "America/Chicago",
    address: "4809 N Elston Ave, Chicago, IL 60630, USA",
    placeId: "ChIJKYNI-qTND4gRk5oNFPplxfE",
    geo: {
      latitude: 41.9683685,
      longitude: -87.74037109999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  // Sample
  // 0: "Fajr\t\t\n\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\n\t\t\t\t\n\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\n\t\t\t06:15"
  // 1: "Dhuhur\t\t\n\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\n\t\t\t\t\n\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\n\t\t\t01:30"
  // 2: "Asr\t\t\n\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\n\t\t\t\t\n\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\n\t\t\t04:00"
  // 3: "IshA\t\t\n\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\n\t\t\t\t\n\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\n\t\t\t07:30"
  const a = util
    .mapToText($, "section")
    .filter((t) =>
      t.match(/^\s*(fajr|dhuhur|asr|isha|el joomoa)\s+\d+\s*:\s*\d+/i),
    )
    .map((t) => t.match(/\d+\s*:\s*\d+$/g)?.[0]);
  a.splice(3, 0, "sunset"); // add maghrib

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-dar-al-hadeeth-chicago",
  ids,
  run,
};
