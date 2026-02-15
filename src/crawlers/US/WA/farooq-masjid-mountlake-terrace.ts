import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "caa87794-d6bc-4f85-ac85-abadcebfa080",
    name: "Masjid Umar Al-Farooq",
    url: "http://www.farooqmasjid.org/",
    address: "5507 238th St SW, Mountlake Terrace, WA 98043, USA",
    placeId: "ChIJs9meeREQkFQR4W-p6fYmZkg",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 47.783136,
      longitude: -122.308054,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText(
    $,
    'article[data-permalink*="prayer-times"] td:last-child',
  );
  // a = ['06:00 AM', '01:40 PM', '05:45 PM', 'soon after Adhan', '9:00 PM', 'soon after Isha', '01:30 PM', '02:10 PM']
  util.setIqamaTimes(ids[0], a);
  // last two entries, skip taraweeh time
  util.setJumaTimes(ids[0], a.slice(-2));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/farooq-masjid-mountlake-terrace",
  ids,
  run,
};
