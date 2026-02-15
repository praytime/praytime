import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "122cfd1e-b3a6-4ba6-a909-a874093573b4",
    name: "Islamic Center of San Francisco (ICSF)",
    url: "http://icofsf.org/",
    timeZoneId: "America/Los_Angeles",
    address: "400 Crescent Ave, San Francisco, CA 94110, USA",
    placeId: "ChIJT1HSIPZ-j4AR9ady0fVgy9Y",
    geo: {
      latitude: 37.7347456,
      longitude: -122.4167193,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=nzKz7bLO",
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
  name: "US/CA/islamic-center-of-san-francisco-icsf-sf",
  ids,
  run,
};
