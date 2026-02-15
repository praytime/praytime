import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1bc0dd47-ec99-40e1-9456-15d98a969b2a",
    name: "Abu Bakr Islamic Center",
    url: "http://www.abubakr.ca/",
    timeZoneId: "America/Vancouver",
    address: "7375 144 St, Surrey, BC V3W 5S7, Canada",
    placeId: "ChIJacSbeTzahVQRa_NMrph1xzU",
    geo: {
      latitude: 49.1368843,
      longitude: -122.8237872,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCAbuBakr/abubakr.html",
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
  name: "CA/BC/abu-bakr-islamic-center-surrey",
  ids,
  run,
};
