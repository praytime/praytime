import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "24ae20e3-223e-441c-9791-bb3e2bed7973",
    name: "Maine Muslim Community Center",
    url: "http://mainemuslims.org/",
    timeZoneId: "America/New_York",
    address: "118 Anderson St, Portland, ME 04101, USA",
    placeId: "ChIJ-S7SQG-cskwRyssJ_8Dbr7s",
    geo: {
      latitude: 43.6665479,
      longitude: -70.2559677,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".prayertime td:last-child");
  const j = util.mapToText($, ".jumuatime td:nth-child(2)");

  util.setIqamaTimes(ids[0], a);
  // new Set ... will dedup: https://stackoverflow.com/a/33121880/8370398
  util.setJumaTimes(ids[0], [...new Set(j)]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/ME/maine-muslim-community-center-portland",
  ids,
  run,
};
