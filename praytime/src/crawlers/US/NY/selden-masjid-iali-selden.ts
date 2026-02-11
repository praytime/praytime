// @ts-nocheck

import axios from "axios";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "03abe42b-deaa-45e1-bb96-2916836b57aa",
    name: "Selden Masjid - IALI",
    url: "http://seldenmasjid.org/",
    timeZoneId: "America/New_York",
    address: "10 Park Hill Dr, Selden, NY 11784, USA",
    placeId: "ChIJuQrJrg5H6IkRxkrEJCnzsZo",
    geo: {
      latitude: 40.8614376,
      longitude: -73.0571557,
    },
  },
];
const run = async () => {
  const response = await axios.get(
    "https://masjidal.com/api/v1/time?masjid_id=pVdw1xLe&_=1637545791880",
  );

  const data = response.data;
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
  name: "US/NY/selden-masjid-iali-selden",
  ids,
  run,
};
