import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "nzKzJoKO";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "90346b00-804c-410c-8d81-945a6cf544c8",
    name: "Islamic Society of Milwaukee",
    url: "https://www.ismonline.org/ism-main-center",
    timeZoneId: "America/Chicago",
    address: "4707 South 13th Street, Milwaukee, WI 53221, USA",
    placeId: "ChIJTeFDRdQWBYgRwISakD6RR40",
    geo: {
      latitude: 42.9588699,
      longitude: -87.92991640000001,
    },
  },
];
const run = async () => {
  const iqama = await util.loadMasjidalIqama(MASJIDAL_ID);
  util.setTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
    iqama.jummah1,
    iqama.jummah2,
    iqama.jummah3,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WI/islamic-society-of-milwaukee-milwaukee",
  ids,
  run,
};
