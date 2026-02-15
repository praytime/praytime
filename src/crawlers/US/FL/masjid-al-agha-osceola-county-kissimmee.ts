import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d94eaa22-0b39-4492-816d-cb813d89d98d",
    name: "Masjid Al Agha - Osceola County",
    url: "http://www.amlcouncil.org/",
    timeZoneId: "America/New_York",
    address: "4990 W Irlo Bronson Memorial Hwy, Kissimmee, FL 34746, USA",
    placeId: "ChIJbRVx4ZmB3YgRaallqzVUFBw",
    geo: {
      latitude: 28.332241,
      longitude: -81.48256239999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "footer td:last-child")
    .filter(util.matchTimeAmPm);
  a.splice(1, 1); // remove sunrise

  util.setIqamaTimes(ids[0], a);
  // util.setJumaTimes(ids[0], j)

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-agha-osceola-county-kissimmee",
  ids,
  run,
};
