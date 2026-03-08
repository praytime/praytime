import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "0kAkaKqD";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3d9ab26e-bdd1-409d-9cdb-2449aa0cba7f",
    name: "Academy of Islamic Education",
    url: "https://www.aiehuntley.com/",
    address: "37W437 Huntley Rd, Dundee Township, IL 60118, USA",
    placeId: "ChIJ01CaFpMRD4gRwo7w36W8taQ",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 42.132128,
      longitude: -88.344777,
    },
  },
];
const run = async () => {
  const iqama = await util.loadMasjidalIqama(MASJIDAL_ID);
  util.setTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
    iqama.jummah1,
    iqama.jummah2,
    iqama.jummah3,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/aie-huntley",
  ids,
  run,
};
