import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0745c2e6-9490-4ae1-9522-1082c63a0496",
    name: "Guildford Islamic Cultural Center (GICC)",
    url: "https://giccmasjid.org/",
    timeZoneId: "America/Vancouver",
    address: "15290 103 A Ave #101, Surrey, BC V3R 7P8, Canada",
    placeId: "ChIJs0qRRRHXhVQRFThmClsZJeY",
    geo: {
      latitude: 49.19003500000001,
      longitude: -122.7981364,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCGuildford/guildford.html",
  );

  $('tr:contains("Zawal")').remove();
  $('tr:contains("Sunrise")').remove();

  const id = ids[0];
  if (!id) throw new Error("No masjid IDs defined");

  const a = util.mapToText($, ".prayer_entry:last-child");
  const j = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

  util.setIqamaTimes(id, a);
  util.setJumaTimes(id, j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/guildford-islamic-cultural-center-gicc-surrey",
  ids,
  run,
};
