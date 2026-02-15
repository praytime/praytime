import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c1a0a188-7058-4683-bc1b-f2613139ad3b",
    name: "Fraserview Muslim Community Services",
    url: "http://thefmcs.ca/",
    timeZoneId: "America/Vancouver",
    address: "6436 Fraser St, Vancouver, BC V5W 3A6, Canada",
    placeId: "ChIJ7SyIShV0hlQRDXG6F58w8n0",
    geo: {
      latitude: 49.2261277,
      longitude: -123.0905783,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCFraser/fraser.html",
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
  name: "CA/BC/fraserview-muslim-community-services-vancouver",
  ids,
  run,
};
