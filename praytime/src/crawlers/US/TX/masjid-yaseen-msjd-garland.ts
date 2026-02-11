// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "f4958f15-1339-4350-8929-ab2369a6b957",
    name: "Masjid Yaseen مسجد",
    url: "http://masjidyaseen.org/",
    timeZoneId: "America/Chicago",
    address: "1601 W Campbell Rd, Garland, TX 75044, USA",
    placeId: "ChIJhwlMxw8cTIYRcIJztNht0iM",
    geo: {
      latitude: 32.9831381,
      longitude: -96.6508097,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".time-course-wrap li span:last-child");
  const j = util.mapToText(
    $,
    "h2",
    $('h2:contains("1st Jumu\'ah")').closest("div.elementor-column").next(),
  );

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-yaseen-msjd-garland",
  ids,
  run,
};
