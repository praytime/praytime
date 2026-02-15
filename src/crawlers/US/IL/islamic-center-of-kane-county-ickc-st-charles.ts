import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "791243b8-00a4-468f-b2f2-1b9fa554227b",
    name: "Islamic Center of Kane County (ICKC)",
    url: "https://www.ickc.info/",
    timeZoneId: "America/Chicago",
    address: "2325 Dean St #100b, St. Charles, IL 60175, USA",
    placeId: "ChIJ224SoUIdD4gRPizBFEBbmsg",
    geo: {
      latitude: 41.9192446,
      longitude: -88.34301239999999,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=x4KB2K5Q",
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
    ]);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-kane-county-ickc-st-charles",
  ids,
  run,
};
