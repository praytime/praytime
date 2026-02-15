import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6f6b03d5-d631-45ca-8fe0-9c2e0c06417c",
    name: "MMI",
    url: "http://www.masjidmadinatulilm.org/",
    timeZoneId: "America/Detroit",
    address: "37775 Palmer Rd, Westland, MI 48186, USA",
    placeId: "ChIJZVcIFPBNO4gR08emhiHVs98",
    geo: {
      latitude: 42.2939083,
      longitude: -83.4120944,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], ["check website"]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MI/mmi-westland",
  ids,
  run,
};
