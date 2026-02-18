import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b8d65560-ac51-4b19-87a0-8b28b2c0e117",
    name: "Queensborough Islamic Centre",
    url: "http://www.awqat.net/Masjids/BCQueensBNW/qbnw.html",
    timeZoneId: "America/Vancouver",
    address: "205 Wood St, New Westminster, BC V3M 5K5, Canada",
    placeId: "ChIJiWIvprXZhVQRmOJtO9CpO7s",
    geo: {
      latitude: 49.1871085,
      longitude: -122.9369715,
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
    "http://www.awqat.net/Masjids/BCQueensBNW/qbnw.html",
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
  name: "CA/BC/queensborough-islamic-centre-new-westminster",
  ids,
  run,
};
