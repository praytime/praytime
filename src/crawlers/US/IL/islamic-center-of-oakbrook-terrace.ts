// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "4dcdad13-521f-448e-8fe9-42a532af76fd",
    name: "ICNA Center Masjid",
    url: "https://www.icnachicago.org/",
    address: "1S270 Summit Ave, Oakbrook Terrace, IL 60181, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJteURQX9NDogRhK9unKWB-IQ",
    geo: {
      latitude: 41.855525,
      longitude: -87.973164,
    },
  },
];
// ChIJ3UwZKHpNDogRUj6fNs7zmrg
const run = async () => {
  const data = await util.loadJson(
    "https://masjidal.com/api/v1/time?masjid_id=rGAEZkdn",
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
  name: "US/IL/islamic-center-of-oakbrook-terrace",
  ids,
  run,
};
