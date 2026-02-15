import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3018b643-7bad-4f51-9e9e-5732fc917460",
    name: "Islamic Center of Murfreesboro مسجد",
    url: "http://icmtn.org/",
    timeZoneId: "America/Chicago",
    address: "2605 Veals Rd, Murfreesboro, TN 37127, USA",
    placeId: "ChIJKW-V5iv5Y4gRdqidxwFUPJY",
    geo: {
      latitude: 35.813789,
      longitude: -86.349572,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayertime tr:last-child td").slice(1);
  a.splice(1, 1); // remove sunrise
  util.setIqamaTimes(ids[0], a);

  const j = util.mapToText($, ".jumuatime tr:last-child td:nth-child(2)");
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TN/islamic-center-of-murfreesboro-msjd-murfreesboro",
  ids,
  run,
};
