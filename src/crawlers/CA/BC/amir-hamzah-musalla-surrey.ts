import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
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
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Amir Hamzah Musalla");
  }

  await util.setAwqatIqamaTimes(masjid, "5b885cd4-2a00-4c41-9593-9335fc44a457");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/amir-hamzah-musalla-surrey",
  ids,
  run,
};
