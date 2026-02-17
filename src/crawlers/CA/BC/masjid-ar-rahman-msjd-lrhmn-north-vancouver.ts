import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "62d852e1-5a57-4642-a123-931f7a760f82",
    name: "Masjid Ar-Rahman مسجد الرحمن",
    url: "http://www.northvanmasjid.ca/",
    timeZoneId: "America/Vancouver",
    address: "1398 15th St W, North Vancouver, BC V7P 1N2, Canada",
    placeId: "ChIJc4dPUdBxhlQR7fGV-NaP59k",
    geo: {
      latitude: 49.3223786,
      longitude: -123.1129938,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for Masjid Ar-Rahman مسجد الرحمن",
    );
  }

  await util.setAwqatIqamaTimes(masjid, "e7bfc68e-552f-4921-851a-cf64127aec31");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-ar-rahman-msjd-lrhmn-north-vancouver",
  ids,
  run,
};
