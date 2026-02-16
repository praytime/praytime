import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "nL1JElAa";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ac03b93d-5d7d-4565-9990-a7b4017ce6a3",
    name: "Masjid Ibrahim",
    url: "https://www.iaypsilanti.org/",
    timeZoneId: "America/Detroit",
    address: "315 S Ford Blvd, Ypsilanti, MI 48198, USA",
    placeId: "ChIJMUt6cJZXO4gRrrLKj8lhQg4",
    geo: {
      latitude: 42.2389668,
      longitude: -83.5793477,
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
  util.setJumaTimes(ids[0], [iqama.jummah1, iqama.jummah2, iqama.jummah3]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-ibrahim-ypsilanti",
  ids,
  run,
};
