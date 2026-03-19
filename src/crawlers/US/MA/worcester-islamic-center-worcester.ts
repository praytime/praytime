import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "QKMno1LB";
const KHUTBAH_TIME = "1:00 PM";

const ids: CrawlerModule["ids"] = [
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
  const iqama = await util.loadMasjidalIqama(MASJIDAL_ID);
  util.setIqamaTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
  ]);
  util.setJumaTimes(ids[0], [KHUTBAH_TIME]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MA/worcester-islamic-center-worcester",
  ids,
  run,
};
