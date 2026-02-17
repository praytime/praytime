import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1bc0dd47-ec99-40e1-9456-15d98a969b2a",
    name: "Abu Bakr Islamic Center",
    url: "http://www.abubakr.ca/",
    timeZoneId: "America/Vancouver",
    address: "7375 144 St, Surrey, BC V3W 5S7, Canada",
    placeId: "ChIJacSbeTzahVQRa_NMrph1xzU",
    geo: {
      latitude: 49.1368843,
      longitude: -122.8237872,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Abu Bakr Islamic Center");
  }

  await util.setAwqatIqamaTimes(masjid, "b5e1a759-5980-4347-be43-8723e3dcaa72");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/abu-bakr-islamic-center-surrey",
  ids,
  run,
};
