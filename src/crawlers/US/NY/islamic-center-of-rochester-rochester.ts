import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1d007881-a772-4532-b97b-ce2a97e3e283",
    name: "Islamic Center of Rochester",
    url: "http://theicr.org/",
    timeZoneId: "America/New_York",
    address: "727 Westfall Rd, Rochester, NY 14620, USA",
    placeId: "ChIJRRRUptRK0YkRIQ16KKbN7PI",
    geo: {
      latitude: 43.1142939,
      longitude: -77.6019146,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".masjidnow-salah-time-iqamah");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-center-of-rochester-rochester",
  ids,
  run,
};
