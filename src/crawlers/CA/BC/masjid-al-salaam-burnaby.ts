import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "91d08993-8341-4229-97f7-04a156c297aa",
    name: "Masjid Al-Salaam",
    url: "http://www.bcmaburnaby.org/",
    timeZoneId: "America/Vancouver",
    address: "5060 Canada Way, Burnaby, BC V5E 3N2, Canada",
    placeId: "ChIJTTr9qqd3hlQR22OMEP7HuNw",
    geo: {
      latitude: 49.2400093,
      longitude: -122.9641189,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Masjid Al-Salaam");
  }

  await util.setAwqatIqamaTimes(masjid, "f267c0e2-edf6-4c01-86cf-2cffdea6c6df");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-al-salaam-burnaby",
  ids,
  run,
};
