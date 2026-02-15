import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bb8768c4-cff0-4dea-b627-976fcd52edb1",
    name: "Lovejoy Masjid",
    url: "http://lovejoymasjid.com/",
    timeZoneId: "America/New_York",
    address: "1107 E Lovejoy St, Buffalo, NY 14206, USA",
    placeId: "ChIJXwXZKuMN04kR7YL_si8OFr8",
    geo: {
      latitude: 42.8895743,
      longitude: -78.8072567,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".pr-tm-bx span:last-child");
  const j = util.mapToText($, ".pr-tm-bx:last-child span");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j.slice(0, 1));
  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/lovejoy-masjid-buffalo",
  ids,
  run,
};
