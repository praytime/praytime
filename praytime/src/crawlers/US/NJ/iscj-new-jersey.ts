// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "36815bd3-d6d5-44a5-a3c2-33a9c5ea42fb",
    name: "Islamic Society of Central Jersey",
    url: "https://iscj.org/",
    address: "4145 US-1, Monmouth Junction, NJ 08852, USA",
    placeId: "ChIJR6vNPjjdw4kR0c3GWMN_KE4",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 40.387797,
      longitude: -74.571199,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");
  const j = a.slice(-1).flatMap(util.matchTimeG);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/iscj-new-jersey",
  ids,
  run,
};
