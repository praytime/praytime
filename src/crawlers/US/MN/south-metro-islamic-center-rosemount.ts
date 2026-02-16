import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "28b3575e-ee0c-4119-a007-17acb27451e0",
    name: "South Metro Islamic Center",
    url: "https://www.southmetroic.org/",
    timeZoneId: "America/Chicago",
    address: "15400 S Robert Trail, Rosemount, MN 55068, USA",
    placeId: "ChIJXbQWP4Q09ocRrozNTohb57U",
    geo: {
      latitude: 44.72677119999999,
      longitude: -93.13164909999999,
    },
  },
];
const run = async () => {
  const iqama = await util.loadMasjidalIqama("3AO2BxLe");
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
  name: "US/MN/south-metro-islamic-center-rosemount",
  ids,
  run,
};
