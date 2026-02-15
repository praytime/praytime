import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4890ed1f-94ab-4ea0-9b78-504a39cf6b30",
    name: "Marpole Musalla",
    url: "https://www.facebook.com/MarpoleMusalla/",
    timeZoneId: "America/Vancouver",
    address: "8879 Selkirk St, Vancouver, BC V6P 4J6, Canada",
    placeId: "ChIJldTKUel0hlQRLi2iYMydDlk",
    geo: {
      latitude: 49.20458290000001,
      longitude: -123.1336184,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCMarpole/marpole.html",
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
  name: "CA/BC/marpole-musalla-vancouver",
  ids,
  run,
};
