import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "abbc5881-d1b1-46fe-b157-b32e6bdc254c",
    name: "Jamia Riyadhul Jannah – Maple Ridge",
    url: "http://riyadhuljannahmosque.com/",
    timeZoneId: "America/Vancouver",
    address: "27079 River Rd, Maple Ridge, BC V2W 1M4, Canada",
    placeId: "ChIJATu0sA0thFQREiEsaW07nA0",
    geo: {
      latitude: 49.1747585,
      longitude: -122.4719714,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "button.prayer-time");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/jamia-riyadhul-jannah-maple-ridge-maple-ridge",
  ids,
  run,
};
