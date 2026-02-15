import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0206cdb6-04e4-4c66-9e53-f68d29abe936",
    name: "The BC Muslim Association",
    url: "http://www.thebcma.com/",
    timeZoneId: "America/Vancouver",
    address: "12300 Blundell Rd, Richmond, BC V6W 1B3, Canada",
    placeId: "ChIJTTr9qqd3hlQRS8t8OS07qUE",
    geo: {
      latitude: 49.1540737,
      longitude: -123.0875606,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCBCMARichmond/bcmarichmond.html",
  );

  $('tr:contains("Zawal")').remove();
  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".prayer_entry:last-child");
  const j = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/the-bc-muslim-association-richmond",
  ids,
  run,
};
