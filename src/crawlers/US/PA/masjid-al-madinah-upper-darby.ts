// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "affcc172-c74d-4ed4-94c1-7d805a19c662",
    name: "Masjid Al-Madinah",
    url: "http://www.udicpa.org/",
    timeZoneId: "America/New_York",
    address: "201 S 69th St, Upper Darby, PA 19082, USA",
    placeId: "ChIJmRNEKDDBxokR_1LdkRv7moc",
    geo: {
      latitude: 39.9563371,
      longitude: -75.2575409,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");
  const j = util
    .mapToText($, 'th:contains("Jumuah")')
    .map(util.extractTimeAmPm);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/PA/masjid-al-madinah-upper-darby",
  ids,
  run,
};
