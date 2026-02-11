// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "0b614d35-724a-4483-bad5-5f20444dd069",
    name: "Masjid Madeena",
    url: "http://masjidmadeena.com",
    timeZoneId: "America/Los_Angeles",
    address: "15935 NE 8th St Suite B100, Bellevue, WA 98008, USA",
    geo: {
      latitude: 47.616337,
      longitude: -122.127469,
    },
    placeId: "ChIJL-zpaLdtkFQRECFsuDUHy6o",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "div.azan-time-body td:last-child");

  a.splice(1, 1); // remove sunrise
  a.splice(3, 1); // remove hanafi asr?
  a.splice(5, 1); // remove juma heading

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/masjid-madeena-bellevue",
  ids,
  run,
};
