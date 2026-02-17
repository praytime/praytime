import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cb14ec15-dcde-45fc-a835-9c89cb72c0ce",
    name: "Masjid Al-Noor (Surrey Mosque)",
    url: "http://www.awqat.net/Masjids/BCAlNoor/alnoor.html",
    timeZoneId: "America/Vancouver",
    address: "13526 98A Ave, Surrey, BC V3T 1C8, Canada",
    placeId: "ChIJ77dABNHZhVQRFScHeVf1vsw",
    geo: {
      latitude: 49.18138679999999,
      longitude: -122.8476144,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for Masjid Al-Noor (Surrey Mosque)",
    );
  }

  await util.setAwqatIqamaTimes(masjid, "09f21b0e-64a6-493f-8e45-e713b05a917b");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-al-noor-surrey-mosque-surrey",
  ids,
  run,
};
