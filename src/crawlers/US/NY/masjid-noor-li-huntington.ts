import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b763f453-2981-4a82-b257-8b13398c0009",
    name: "Masjid Noor LI",
    url: "http://www.masjidnoorli.org/",
    timeZoneId: "America/New_York",
    address: "1032 Park Ave, Huntington, NY 11743, USA",
    placeId: "ChIJB2BjazQv6IkRqt50P8s6XTU",
    geo: {
      latitude: 40.8393664,
      longitude: -73.3664711,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "td:last-child").filter(util.matchTimeAmPm);
  a.splice(1, 1); // remove sunrise
  a.splice(3, 0, "-"); // add maghrib back in
  const j =
    util
      .mapToText($, 'p:contains("First JUMA")')
      .map((t) => t.split("|"))
      .shift()
      ?.map(util.extractTimeAmPm) ?? [];

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-noor-li-huntington",
  ids,
  run,
};
