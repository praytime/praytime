import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ce84b215-b5c5-4b48-8cdb-e8ab0598d0e8",
    name: "Madinah Masjid (sunni sufi qadri)",
    url: "http://www.madinahmasjid.us/",
    timeZoneId: "America/Chicago",
    address: "4850 N St Louis Ave, Chicago, IL 60625, USA",
    placeId: "ChIJv0TyaufND4gR0lJpqXVAsJs",
    geo: {
      latitude: 41.9700503,
      longitude: -87.7161519,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "th.prayerName ~ td:last-child");
  a.splice(1, 1); // remove sunrise

  const j = util
    .mapToText($, 'h5:contains("Jamaat")')
    .flatMap((t) => t.split("\n"))
    .map(util.extractTimeAmPm);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/madinah-masjid-sunni-sufi-qadri-chicago",
  ids,
  run,
};
