// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "3c8b3ff6-3c97-4d33-9a12-946c05879525",
    name: "Amir Hamzah Musalla",
    url: "http://www.awqat.net/Masjids/BCAmirHamza/amir.html",
    timeZoneId: "America/Vancouver",
    address: "9250 120 St, Surrey, BC V3V 4B7, Canada",
    placeId: "ChIJuR6V8avZhVQRcBGKOQC60is",
    geo: {
      latitude: 49.171089,
      longitude: -122.88979,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCAmirHamza/amir.html",
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
  name: "CA/BC/amir-hamzah-musalla-surrey",
  ids,
  run,
};
