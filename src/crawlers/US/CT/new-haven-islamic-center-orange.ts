// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "3fb78a17-efc7-4eb8-8d5e-7415fdc0b000",
    name: "New Haven Islamic Center",
    url: "https://nhicct.org/",
    timeZoneId: "America/New_York",
    address: "254 Bull Hill Ln, Orange, CT 06477, USA",
    placeId: "ChIJhf2i1wN26IkRAZeTQrfjWvA",
    geo: {
      latitude: 41.2735961,
      longitude: -72.9886806,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayertime td:last-child");
  a.splice(1, 1); // remove sunrise
  util.setIqamaTimes(ids[0], a);

  const j = util.mapToText($, ".jumuatime td:nth-child(2)");
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CT/new-haven-islamic-center-orange",
  ids,
  run,
};
