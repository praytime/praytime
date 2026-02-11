// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "94139b0d-f7fa-4068-8225-70b1dac9b860",
    name: "North Austin Muslim Community Center (NAMCC - Masjid Aisha)",
    url: "https://www.namcc.org/",
    timeZoneId: "America/Chicago",
    address: "11900 N Lamar Blvd, Austin, TX 78753, USA",
    placeId: "ChIJBxxERkzJRIYRsUBhKtzHMZA",
    geo: {
      latitude: 30.39018649999999,
      longitude: -97.68398069999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  $('table.prayer_table tr:contains("Sunrise")').remove();

  const a = util.mapToText($, "table.prayer_table td:last-child");
  const j = util.mapToText($, "div.jumuatime td:nth-child(2)");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/north-austin-muslim-community-center-namcc-masjid-aisha-austin",
  ids,
  run,
};
