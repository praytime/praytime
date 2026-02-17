import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d810c1d5-65a1-45a9-a6b7-e7f646122836",
    name: "Surrey Jamea Masjid",
    url: "http://surrey.thebcma.com/",
    timeZoneId: "America/Vancouver",
    address: "12407 72 Ave, Surrey, BC V3W 2M5, Canada",
    placeId: "ChIJ26fzCGLZhVQRcuPQN3P7jHw",
    geo: {
      latitude: 49.1342609,
      longitude: -122.8786961,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Surrey Jamea Masjid");
  }

  await util.setAwqatIqamaTimes(masjid, "01b11b55-7156-4559-a05c-e1534d99d943");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/surrey-jamea-masjid-surrey",
  ids,
  run,
};
