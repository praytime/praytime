// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "ccf25f54-4fdd-44ea-a20c-5f52b7d17287",
    name: "Masjid Bilal - ISGH",
    url: "http://www.masjidbilalnz.org/",
    timeZoneId: "America/Chicago",
    address: "11815 Adel Rd, Houston, TX 77067, USA",
    placeId: "ChIJfV9wUtjLQIYRG0UPxjF2Nis",
    geo: {
      latitude: 29.95739159999999,
      longitude: -95.44862479999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "div.paragraph strong")
    .filter((t) => t.match(/(fajr|zuhr|asr|isha)/i))
    .map((t) => t.match(/\d{1,2}\s*:\s*\d{1,2}/)[0]);
  a.splice(3, 0, "-"); // add maghrib

  const j = util
    .mapToText($, "div.paragraph strong")
    .filter((t) => t.match(/jummah/i))
    .map((t) => t.match(/\d{1,2}\s*:\s*\d{1,2}/)[0]);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-bilal-isgh-houston",
  ids,
  run,
};
