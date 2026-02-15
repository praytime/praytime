import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9243a2d4-7919-4157-9473-b4f00b84b2b0",
    name: "Guiding Light Islamic Center",
    url: "http://www.guidinglightcenter.org/",
    timeZoneId: "America/New_York",
    address: "6500 Six Mile Ln, Louisville, KY 40220, USA",
    placeId: "ChIJxaBG7_kKaYgR2RL7DTUv37g",
    geo: {
      latitude: 38.196884,
      longitude: -85.6340991,
    },
  },
];
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=6kK35Aen",
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
  name: "US/KY/guiding-light-islamic-center-louisville",
  ids,
  run,
};
