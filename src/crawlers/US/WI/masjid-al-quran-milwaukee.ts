import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "482bb7de-d026-4064-9eb2-6cbe1d0098a4",
    name: "Masjid Al-Qur'an",
    url: "https://www.alquranmke.org/",
    timeZoneId: "America/Chicago",
    address: "11723 W Brown Deer Rd, Milwaukee, WI 53224, USA",
    placeId: "ChIJGaXwiZj9BIgRZoLPmCAp_Zw",
    geo: {
      latitude: 43.1764066,
      longitude: -88.0582869,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=0aAejzdj",
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
  name: "US/WI/masjid-al-quran-milwaukee",
  ids,
  run,
};
