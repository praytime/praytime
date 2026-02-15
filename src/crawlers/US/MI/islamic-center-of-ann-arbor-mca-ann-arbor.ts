import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dd1bc539-cafe-4f39-b21d-f2a51e9040e7",
    name: "Islamic Center of Ann Arbor (MCA)",
    url: "http://mca-a2.org/",
    timeZoneId: "America/Detroit",
    address: "2301 Plymouth Rd, Ann Arbor, MI 48105, USA",
    placeId: "ChIJoTX09ymsPIgRO8InMPpKP-4",
    geo: {
      latitude: 42.3011923,
      longitude: -83.714602,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "table.dptTimetable td.jamah");
  util.setIqamaTimes(ids[0], a);

  const j = util
    .mapToText($, "table.dptTimetable ~ ul li")
    .map(util.extractTimeAmPm);

  if (j.length > 3) {
    // stuff fourth juma into third
    j[2] = `${j[2]}, fourth: ${j[3]}`;
  }

  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-ann-arbor-mca-ann-arbor",
  ids,
  run,
};
