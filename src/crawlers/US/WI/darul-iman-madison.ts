import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3957ee06-b3c4-4700-9e97-3a91ba3aba02",
    name: "Darul Iman",
    url: "http://darul-iman.org/",
    timeZoneId: "America/Chicago",
    address: "638 Grand Canyon Dr, Madison, WI 53719, USA",
    placeId: "ChIJoYx2GF-uB4gR7VsPymo-w08",
    geo: {
      latitude: 43.0541468,
      longitude: -89.4979393,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "td:last-child", $('td:contains("Fajr")').closest("table"))
    .slice(2);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WI/darul-iman-madison",
  ids,
  run,
};
