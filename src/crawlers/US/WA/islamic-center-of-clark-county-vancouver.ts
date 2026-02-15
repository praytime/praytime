import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5f235139-90e2-4f02-a5d6-61f2f481578a",
    name: "Islamic Center of Clark County",
    url: "http://www.icccwa.org/",
    timeZoneId: "America/Los_Angeles",
    address: "519 SE 116th Ave Suite 3, Vancouver, WA 98683, USA",
    placeId: "ChIJPWpXenWllVQRpLjIj7Fc3Ds",
    geo: {
      latitude: 45.617581,
      longitude: -122.553118,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://albara.ramli.net/iqamah/icdx.php?city=vancouver",
  );

  const a = util.mapToText($, ".views-table td:last-child");
  a.splice(1, 1);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-clark-county-vancouver",
  ids,
  run,
};
