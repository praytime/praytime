import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "36487615-29b9-40ec-b2b3-0a8cb64d35c0",
    name: "Al-Hidaya Center Latham",
    url: "http://www.al-hidaya.org/",
    timeZoneId: "America/New_York",
    address: "322 Troy Schenectady Rd, Latham, NY 12110, USA",
    placeId: "ChIJo_XWj9UN3okRnB_UDKwGt0U",
    geo: {
      latitude: 42.74223629999999,
      longitude: -73.7484829,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "h3")
    .map((t) => (t.split("-", 2)[1] ?? "").trim());

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/al-hidaya-center-latham-latham",
  ids,
  run,
};
