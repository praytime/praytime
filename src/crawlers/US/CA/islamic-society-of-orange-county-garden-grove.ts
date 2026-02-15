import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e8c1540f-33c3-4b9f-9109-31860ad8e4fb",
    name: "Islamic Society of Orange County",
    url: "http://isocmasjid.org/",
    timeZoneId: "America/Los_Angeles",
    address: "Al-Rahman Plaza, Garden Grove, CA 92844, USA",
    placeId: "ChIJE-42osUn3YARXKz_10eBh88",
    geo: {
      latitude: 33.7555012,
      longitude: -117.9584296,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "table.dptTimetable tr:last-child td");
  const j = util
    .mapToText($, "aside#dailyprayertime-7 + aside")
    .map((t) => t.match(/\d+\s*:\s*\d+\s*\w+/g)?.[0]);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-society-of-orange-county-garden-grove",
  ids,
  run,
};
