import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "eaaee155-6b13-4225-b33d-edbd30f9a1f4",
    name: "Muslim Association of Canada- MAC",
    url: "http://www.macvancouver.ca/",
    timeZoneId: "America/Vancouver",
    address: "2122 Kingsway, Vancouver, BC V5N 2T5, Canada",
    placeId: "ChIJkRbU7R5_C0ERIXzI_E46o2k",
    geo: {
      latitude: 49.24414489999999,
      longitude: -123.0635251,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCMAC/macvancouver.html",
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
  name: "CA/BC/muslim-association-of-canada-mac-vancouver",
  ids,
  run,
};
