import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "06d76993-f828-4543-a45a-c6a5acc02641",
    name: "San Ramon Valley Islamic Center",
    url: "http://www.srvic.org/",
    address: "2232 Camino Ramon, San Ramon, CA 94583, USA",
    placeId: "ChIJgZMAveryj4ARu8cHwsFnX0E",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.776787,
      longitude: -121.969178,
    },
  },
];
const run = async () => {
  const $ = await util.load("https://srvic.org/");

  util.setIqamaTimes(ids[0], util.mapToText($, "td.jamah").slice(0, 5));
  util.setJumaTimes(ids[0], util.mapToText($, "span.dsJumuah"));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/san-ramon-valley-islamic-center",
  ids,
  run,
};
