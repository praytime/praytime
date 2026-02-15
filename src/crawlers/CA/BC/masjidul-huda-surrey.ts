import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "28053399-a726-4448-87d7-1c251ec7a79f",
    name: "Masjidul Huda",
    url: "http://www.awqat.net/Masjids/BCHuda/huda.html",
    timeZoneId: "America/Vancouver",
    address: "14136 Grosvenor Rd, Surrey, BC V3R 5G8, Canada",
    placeId: "ChIJ6biWm5fXhVQRmYCDw8ORGY4",
    geo: {
      latitude: 49.2070339,
      longitude: -122.8300811,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://www.awqat.net/Masjids/BCHuda/huda.html");

  $('tr:contains("Zawal")').remove();
  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".prayer_entry:last-child");
  const j = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjidul-huda-surrey",
  ids,
  run,
};
