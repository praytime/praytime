import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ac498995-31d3-488a-ab22-3942e8e831e8",
    name: "Masjid Omar Al-Farooq",
    url: "http://www.masjidomar.ca/",
    timeZoneId: "America/Vancouver",
    address: "1659 E 10th Ave, Vancouver, BC V5N 1X6, Canada",
    placeId: "ChIJsRYB605xhlQRhY3ZiJngoYY",
    geo: {
      latitude: 49.2616005,
      longitude: -123.0705968,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Masjid Omar Al-Farooq");
  }

  await util.setAwqatIqamaTimes(masjid, "28e9a078-c04d-43d6-a4de-3037697c34ab");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-omar-al-farooq-vancouver",
  ids,
  run,
};
