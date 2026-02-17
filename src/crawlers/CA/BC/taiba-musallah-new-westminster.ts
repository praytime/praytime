import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "38249aab-12d0-4ed0-a642-32fd0e1209d2",
    name: "Taiba Musallah",
    url: "https://cicsnw.org/",
    timeZoneId: "America/Vancouver",
    address: "1206 Kingston St, New Westminster, BC V3M 2R9, Canada",
    placeId: "ChIJMxgNB9d3hlQRIReL93nDIUE",
    geo: {
      latitude: 49.2098442,
      longitude: -122.9344162,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Taiba Musallah");
  }

  await util.setAwqatIqamaTimes(masjid, "20f192db-eedf-4440-9a9d-dafd70ccafb3");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/taiba-musallah-new-westminster",
  ids,
  run,
};
