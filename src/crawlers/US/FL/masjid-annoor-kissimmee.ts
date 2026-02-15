import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "de62cdba-f650-4c04-b744-f46a1a042f3d",
    name: "Masjid ANNOOR",
    url: "http://www.masjidannoor.org/",
    timeZoneId: "America/New_York",
    address: "3496 Polynesian Isle Blvd, Kissimmee, FL 34746, USA",
    placeId: "ChIJC0pAKrqB3YgRQwqP2WxE-xY",
    geo: {
      latitude: 28.3460731,
      longitude: -81.4882659,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://www.masjidannoor.org/iquama.html");

  const a = util.mapToText($, "td:last-child .style15").filter(util.matchTime);

  a.splice(3, 0, "-"); // add maghrib

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-annoor-kissimmee",
  ids,
  run,
};
