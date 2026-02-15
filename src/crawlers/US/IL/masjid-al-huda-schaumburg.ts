import axios from "axios";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2b591b0a-6808-459b-8998-7e74f0251898",
    name: "Masjid Al Huda",
    url: "http://masjidalhuda.org/",
    address: "1081 Irving Park Rd, Schaumburg, IL 60193, USA",
    placeId: "ChIJfXzPEG6pD4gRv_p7cMLrda8",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.997743,
      longitude: -88.118683,
    },
  },
];
const run = async () => {
  const response = await axios.get(
    "https://masjidal.com/api/v1/time?masjid_id=1QL0GKZD&_=1635769879216",
  );

  const data = response.data;
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
  name: "US/IL/masjid-al-huda-schaumburg",
  ids,
  run,
};
