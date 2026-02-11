// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "bb8aa17e-d6a6-4667-a049-82cad24cea1e",
    name: "Ajyal Islamic Centre",
    url: "http://www.ajyal.ca/",
    timeZoneId: "America/Vancouver",
    address: "181 Keefer Pl #202, Vancouver, BC V6B 6C1, Canada",
    placeId: "ChIJ36hVv3txhlQRuCa54_9_uAU",
    geo: {
      latitude: 49.28007460000001,
      longitude: -123.108579,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://www.awqat.net/Masjids/BCAjyal/ajyal.html");

  $('tr:contains("Zawal")').remove();
  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".prayer_entry:last-child");
  const j = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/ajyal-islamic-centre-vancouver",
  ids,
  run,
};
