import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cdecd5be-ecfb-440a-90e1-684d4b1fe943",
    name: "Al Arqam Foundation Community Centre and Services",
    url: "http://www.arqam.ca/",
    timeZoneId: "America/Vancouver",
    address: "8250 Fraser St, Vancouver, BC V5X 3X6, Canada",
    placeId: "ChIJkZZTZUB1hlQRx4G9mNGyMIQ",
    geo: {
      latitude: 49.20967809999999,
      longitude: -123.0907952,
    },
  },
];

const setUnavailableTimes = (index: number) => {
  const record = ids[index];
  if (!record) {
    return;
  }
  util.setIqamaTimes(record, [
    "check website",
    "check website",
    "check website",
    "check website",
    "check website",
  ]);
  util.setJumaTimes(record, ["check website"]);
};

const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCAlArqam/bcalarqam.html",
  );

  $('tr:contains("Zawal")').remove();
  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".prayer_entry:last-child");
  const j = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

  if (a.length >= 5) {
    util.setIqamaTimes(ids[0], a);
  } else {
    setUnavailableTimes(0);
  }
  if (j.length > 0) {
    util.setJumaTimes(ids[0], j);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/al-arqam-foundation-community-centre-and-services-vancouver",
  ids,
  run,
};
