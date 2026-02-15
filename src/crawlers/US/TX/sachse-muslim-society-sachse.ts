import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "06839ac9-088d-463a-a98b-5b539648b011",
    name: "Sachse Muslim Society",
    url: "http://www.sachsemuslimsociety.net/",
    timeZoneId: "America/Chicago",
    address: "7340 S State Hwy 78 #280, Sachse, TX 75048, USA",
    placeId: "ChIJ28z7rVMDTIYRpmW_HmWfCgs",
    geo: {
      latitude: 32.9878767,
      longitude: -96.5750841,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  // :not(:has(*)) selects elements that do not have any children
  // https://stackoverflow.com/a/11061657/8370398
  const a = util
    .mapToText($, 'div:not(:has(*)):contains("IQAMA")')
    .map((t) => t.replace("IQAMA:", "").trim());
  const j = util
    .mapToText($, 'div:not(:has(*)):contains("Khutba")')
    .filter(util.matchTimeAmPm)
    .map((t) => t.replace("Khutba:", "").trim());

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/sachse-muslim-society-sachse",
  ids,
  run,
};
