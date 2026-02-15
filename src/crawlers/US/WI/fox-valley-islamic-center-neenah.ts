import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "51036ea9-368e-40d5-8dec-78686f036226",
    name: "Fox Valley Islamic Center",
    url: "https://fvis.org/",
    timeZoneId: "America/Chicago",
    address: "103 Kappell Dr, Neenah, WI 54956, USA",
    placeId: "ChIJsUQNwGC_A4gRJMO8Bs8IqOQ",
    geo: {
      latitude: 44.141679,
      longitude: -88.47543399999999,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://fiveprayers.org/display/index.php?id=fvis");

  const a = util.mapToText($, "td[id$=Iq]");
  const j = util.mapToText($, "td#fdp");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WI/fox-valley-islamic-center-neenah",
  ids,
  run,
};
