import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cabac678-ddec-439d-bfab-1d5a9eebabd2",
    name: "Muslim Association of Lehigh Valley (MALV)",
    url: "https://malv.org/",
    timeZoneId: "America/New_York",
    address: "1988 Schadt Ave, Whitehall, PA 18052, USA",
    placeId: "ChIJtdBRl8k5xIkRRf7aoxRK3RQ",
    geo: {
      latitude: 40.6373832,
      longitude: -75.5068182,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=ZyLj4YdQ",
  );
  if (data.status === "success") {
    const iqama = data.data.iqama;
    util.setIqamaTimes(ids[0], [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
    ]);
    ids[0].juma1 = iqama.jummah1;
    ids[0].juma2 = iqama.jummah2;
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/PA/muslim-association-of-lehigh-valley-malv-fullerton",
  ids,
  run,
};
