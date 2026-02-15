import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "70ca0fb6-989a-4253-bb41-5285d40a583e",
    name: "Islamic Center of Flint",
    url: "http://www.flintislamiccenter.com/",
    timeZoneId: "America/Detroit",
    address: "9447 Corunna Rd, Swartz Creek, MI 48473, USA",
    placeId: "ChIJ69IRSe11I4gR1TQY6g_rse0",
    geo: {
      latitude: 42.9994444,
      longitude: -83.86749999999999,
    },
  },
  {
    uuid4: "2cce29ac-a700-4576-987e-417a17c23e10",
    name: "Dyewood Islamic Center",
    url: "http://www.flintislamiccenter.com/",
    timeZoneId: "America/Detroit",
    address: "5270 N Dyewood Dr, Flint, MI 48532, USA",
    placeId: "ChIJt_5e0mCdI4gR_ozwy9LfmSo",
    geo: {
      latitude: 43.01094000000001,
      longitude: -83.785725,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=E5Avv2AX",
  );

  if (data.status === "success") {
    const iqama = data.data.iqama;
    const a = [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
      iqama.jummah1,
    ];
    util.setTimesAll(ids, a);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-flint-swartz-creek",
  ids,
  run,
};
