import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bb8aa17e-d6a6-4667-a049-82cad24cea1e",
    name: "Ajyal Islamic Centre",
    url: "http://www.ajyal.ca/",
    timeZoneId: "America/Vancouver",
    address: "181 Keefer Pl #202, Vancouver, BC V6B 6C1, Canada",
    placeId: "ChIJ36hVv3txhlQRuCa54_9_uAU",
    geo: {
      latitude: 49.28007460000001,
      longitude: -123.108579,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Ajyal Islamic Centre");
  }

  await util.setAwqatIqamaTimes(masjid, "840ffdd4-a1d2-4025-8b79-46bb4b18f457");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/ajyal-islamic-centre-vancouver",
  ids,
  run,
};
