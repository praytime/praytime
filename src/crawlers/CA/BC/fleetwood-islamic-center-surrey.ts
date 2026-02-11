// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "33a6100c-a7e2-42c3-9c5c-fbccd8f9e30a",
    name: "Fleetwood Islamic Center",
    url: "https://www.facebook.com/pages/Fleetwood-Islamic-Centre/374700776014820",
    timeZoneId: "America/Vancouver",
    address: "8462 162 St unit #209-210, Surrey, BC V4N 1B3, Canada",
    placeId: "ChIJl3njCLrQhVQRnbiwaIEVcOw",
    geo: {
      latitude: 49.15658359999999,
      longitude: -122.7718178,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "http://www.awqat.net/Masjids/BCFleetwood/fleetwood.html",
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
  name: "CA/BC/fleetwood-islamic-center-surrey",
  ids,
  run,
};
