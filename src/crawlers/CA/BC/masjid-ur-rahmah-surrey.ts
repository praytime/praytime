import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "284fee65-1396-487f-b072-53387e4a6458",
    name: "Masjid-Ur-Rahmah",
    url: "http://org.thebcma.com/surreyeast/",
    timeZoneId: "America/Vancouver",
    address: "13585 62 Ave, Surrey, BC V3X 2J3, Canada",
    placeId: "ChIJT-WCqLDbhVQRlHz7j_kwtOE",
    geo: {
      latitude: 49.115612,
      longitude: -122.8457184,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Masjid-Ur-Rahmah");
  }

  await util.setAwqatIqamaTimes(masjid, "30095751-d33a-4daa-963b-a56d38cdb261");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-ur-rahmah-surrey",
  ids,
  run,
};
