// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "95e1f6ed-2bff-4706-bd5b-acdec8b29189",
    name: "Dar-Ul-Eimaan",
    url: "https://daruleimaan.org/",
    timeZoneId: "America/Chicago",
    address: "2315 W Devon Ave, Chicago, IL 60659, USA",
    geo: {
      latitude: 41.9975,
      longitude: -87.688097,
    },
    placeId: "ChIJbeNnI93RD4gRjNqErgEXDUo",
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "table.salat_table span:last-child");
  a.splice(1, 1); // remove sunrise
  util.setIqamaTimes(ids[0], a);

  // no juma times on website

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/dar-ul-eimaan-chicago",
  ids,
  run,
};
