import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d5efbd90-a918-481d-982e-90379f5975e6",
    name: "Masjid At-Taqwa",
    url: "https://masjidattaqwa.org/",
    timeZoneId: "America/Detroit",
    address: "2680 Golfside Rd, Ann Arbor, MI 48108, USA",
    placeId: "ChIJXbuZp9yoPIgRVOMrNTmT_N8",
    geo: {
      latitude: 42.24916,
      longitude: -83.661371,
    },
  },
];
const run = async () => {
  const iqama = await util.loadMasjidalIqama("xdy0XnAX");

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
  name: "US/MI/masjid-at-taqwa-ann-arbor",
  ids,
  run,
};
