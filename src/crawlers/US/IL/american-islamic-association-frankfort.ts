// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "f92486e8-f93d-456e-b1e6-1c99ddce160d",
    name: "American Islamic Association",
    url: "http://www.aiamasjid.org/",
    timeZoneId: "America/Chicago",
    address: "8860 W Saint Francis Rd, Frankfort, IL 60423, USA",
    placeId: "ChIJr3oCQOsUDogRFCmODcj5CXc",
    geo: {
      latitude: 41.522716,
      longitude: -87.832695,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=VGA6grde",
  );

  if (data.status === "success") {
    const iqama = data.data.iqama;
    util.setTimes(ids[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1,
      iqama.jummah2,
    ]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/american-islamic-association-frankfort",
  ids,
  run,
};
