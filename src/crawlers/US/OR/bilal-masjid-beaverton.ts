// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "ebc421c8-5dc4-48f1-a896-660f1979e922",
    name: "Bilal Masjid",
    url: "http://www.bilalmasjid.com/",
    timeZoneId: "America/Los_Angeles",
    address: "4115 SW 160th Ave, Beaverton, OR 97007, USA",
    placeId: "ChIJ1zBAhokOlVQR2TdaCbFyL9k",
    geo: {
      latitude: 45.490128,
      longitude: -122.842614,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "span[id$=Iqama]");
  const j = util
    .mapToText($, "span[id$=JummahTime]")
    .map(util.matchTimeAmPmG)
    .shift();

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/OR/bilal-masjid-beaverton",
  ids,
  run,
};
