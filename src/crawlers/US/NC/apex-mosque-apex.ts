// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "f1cd423f-daef-40c5-b074-18f0613b3801",
    name: "Apex Mosque",
    url: "http://www.apexmosque.org/",
    timeZoneId: "America/New_York",
    address: "733 Center St, Apex, NC 27502, USA",
    placeId: "ChIJuSIwU6aSrIkRpc40xGuB12A",
    geo: {
      latitude: 35.7296577,
      longitude: -78.8410203,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");
  const j = util
    .mapToText($, ".gridtable tr:nth-child(2) td:last-child")
    .flatMap(util.matchTimeG);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NC/apex-mosque-apex",
  ids,
  run,
};
