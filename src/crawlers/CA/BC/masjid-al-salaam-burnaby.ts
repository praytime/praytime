import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "91d08993-8341-4229-97f7-04a156c297aa",
    name: "Masjid Al-Salaam",
    url: "http://www.bcmaburnaby.org/",
    timeZoneId: "America/Vancouver",
    address: "5060 Canada Way, Burnaby, BC V5E 3N2, Canada",
    placeId: "ChIJTTr9qqd3hlQR22OMEP7HuNw",
    geo: {
      latitude: 49.2400093,
      longitude: -122.9641189,
    },
  },
];
const run = async () => {
  const $ = await util.load("http://www.awqat.net/Masjids/BCSalam/salam.html");

  $('tr:contains("Suhor")').remove();
  $('tr:contains("Zawal")').remove();
  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".prayer_entry:last-child");
  const j = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for BC/masjid-al-salaam-burnaby",
    );
  }

  util.setIqamaTimes(masjid, a);
  util.setJumaTimes(masjid, j);
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-al-salaam-burnaby",
  ids,
  run,
};
