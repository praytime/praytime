import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "184063c6-dac2-4c22-b215-81ca4bb58462",
    name: "Islamic Center of Redmond",
    url: "http://www.redmondmosque.com/",
    timeZoneId: "America/Los_Angeles",
    address: "18080 NE 68th St, Redmond, WA 98052, USA",
    placeId: "ChIJTUmMm79ykFQRCzjM_61h-Bg",
    geo: {
      latitude: 47.66775579999999,
      longitude: -122.0978881,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah").filter((t) => t.length > 0);

  if (!util.isJumaToday(ids[0])) {
    const j = (a[5] ?? "").match(util.timeAmPmRxG);
    util.setJumaTimes(ids[0], j);
  } else {
    const j = (a[1] ?? "").match(util.timeAmPmRxG);
    a[1] = "Juma";
    util.setJumaTimes(ids[0], j);
  }

  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-redmond-redmond",
  ids,
  run,
};
