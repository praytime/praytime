// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "306651ec-a531-40c9-8192-b25b1fdfb1b1",
    name: "Masjid Rohingnya Milwaukee",
    url: "http://www.masjidmubarak.org/",
    timeZoneId: "America/Chicago",
    address: "1575 W Oklahoma Ave, Milwaukee, WI 53215, USA",
    placeId: "ChIJbZr9Og8RBYgRNSPUgXylxd0",
    geo: {
      latitude: 42.9881529,
      longitude: -87.9334941,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayerbloc td:last-child");
  a.splice(1, 1); // remove sunrise

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WI/masjid-rohingnya-milwaukee-milwaukee",
  ids,
  run,
};
