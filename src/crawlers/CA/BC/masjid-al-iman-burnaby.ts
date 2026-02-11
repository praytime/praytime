// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "429a18d3-7d29-4dcc-beb5-3c98628a5fea",
    name: "Masjid Al-Iman",
    url: "http://www.awqat.net/Masjids/BCAlIman/aliman.html",
    timeZoneId: "America/Vancouver",
    address: "6125 Sussex Ave, Burnaby, BC V5H 4G1, Canada",
    placeId: "ChIJL1L7Vlh2hlQRc_MW7kzdp-8",
    geo: {
      latitude: 49.2289475,
      longitude: -122.9990167,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCAlIman/aliman.html",
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
  name: "CA/BC/masjid-al-iman-burnaby",
  ids,
  run,
};
