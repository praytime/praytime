import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "nzKzJoKO";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f55066a3-d207-4760-b34f-392b1a991e22",
    name: "ISM University Center",
    url: "https://www.ismonline.org/ism-university",
    timeZoneId: "America/Chicago",
    address: "2223 E Kenwood Blvd, Milwaukee, WI 53211, USA",
    placeId: "ChIJlwNHTcwYBYgRTaUEqvcxJjg",
    geo: {
      latitude: 43.0744352,
      longitude: -87.88185109999999,
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
  name: "US/WI/ism-university-center-milwaukee",
  ids,
  run,
};
