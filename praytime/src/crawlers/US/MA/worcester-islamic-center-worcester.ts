// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "6d1599b5-72cc-499f-8ce9-f7a95e93f52f",
    name: "Worcester Islamic Center",
    url: "http://www.wicmasjid.org/",
    timeZoneId: "America/New_York",
    address: "248 Mountain St E, Worcester, MA 01606, USA",
    placeId: "ChIJnQS15PkH5IkRlC4IR8Vuhuo",
    geo: {
      latitude: 42.31542109999999,
      longitude: -71.77388320000001,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://www-wicmasjid-org.filesusr.com/html/e3b11b_a36b5b843a2eba43af53490778fa171c.html",
  );

  const a = util.mapToText($, "td:last-child").filter(util.matchTimeAmPm);

  a.splice(3, 0, ""); // insert maghrib

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MA/worcester-islamic-center-worcester",
  ids,
  run,
};
