import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f4ca5523-68f0-4e04-8314-442419bcfc77",
    name: "Dar Alnoor Islamic Community Center",
    url: "http://www.daralnoor.org/",
    timeZoneId: "America/New_York",
    address: "5404 Hoadly Rd, Manassas, VA 20112, USA",
    placeId: "ChIJCTgvjXhXtokRmacDmgv-62o",
    geo: {
      latitude: 38.6766,
      longitude: -77.370269,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "#prayertimedetails-11 li div:last-child");
  a.splice(0, 1); // remove header
  a.splice(1, 1); // remove sunrise
  const j = (a[a.length - 1] ?? "").match(/\d+\s*:\s*\d+\s*\w+/g);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/dar-alnoor-islamic-community-center-manassas",
  ids,
  run,
};
