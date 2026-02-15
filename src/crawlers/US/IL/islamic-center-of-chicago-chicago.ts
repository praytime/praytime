import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c6235d31-e9fc-4f30-9005-7c50b4116d2a",
    name: "Islamic Center of Chicago",
    url: "http://nahdaus.org/",
    timeZoneId: "America/Chicago",
    address: "3357 W 63rd St, Chicago, IL 60629, USA",
    placeId: "ChIJ4ZXGXc0xDogRkowOpYePJqE",
    geo: {
      latitude: 41.77861109999999,
      longitude: -87.7077778,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayer-iqama");
  a.splice(1, 1); // remove sunrise

  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-chicago-chicago",
  ids,
  run,
};
