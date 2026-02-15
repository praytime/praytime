import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "012ed6d8-6c79-4374-a9ac-aecf51863469",
    name: "Salahadeen Center",
    url: "http://www.scntn.org/",
    timeZoneId: "America/Chicago",
    address: "364 Elysian Fields Ct, Nashville, TN 37211, USA",
    placeId: "ChIJ5WmZn51vZIgR-gHAT0SJiqk",
    geo: {
      latitude: 36.0871618,
      longitude: -86.728723,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayertime td:last-child");
  a.splice(1, 1); // remove sunrise

  const j = util.mapToText($, ".jumuatime td:nth-child(2)");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TN/salahadeen-center-nashville",
  ids,
  run,
};
