import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "nzKzJoKO";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "13211926-3e33-4516-b22e-23ecafffad46",
    name: "Masjid Al Noor, ISM West",
    url: "https://www.ismonline.org/ism-brookfield",
    timeZoneId: "America/Chicago",
    address: "16670 Pheasant Dr, Brookfield, WI 53005, USA",
    placeId: "ChIJ8d4ATMMGBYgR-wMaKrJER0w",
    geo: {
      latitude: 43.06634710000001,
      longitude: -88.1199051,
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
  name: "US/WI/masjid-al-noor-ism-west-brookfield",
  ids,
  run,
};
