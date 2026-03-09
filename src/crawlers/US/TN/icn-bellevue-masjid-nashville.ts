import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MADINAAPPS_CLIENT_ID = "86";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "06218b10-3f44-4217-ac3b-e98eb30461d7",
    name: "ICN Bellevue Masjid",
    url: "http://icnbm.org/",
    timeZoneId: "America/Chicago",
    address: "7337 Charlotte Pike, Nashville, TN 37209, USA",
    placeId: "ChIJrdHzzZeJZIgR54n1bWVzeFE",
    geo: {
      latitude: 36.1172624,
      longitude: -86.91980459999999,
    },
  },
];
const run = async () => {
  const prayerTimes =
    await util.loadMadinaAppsPrayerTimes(MADINAAPPS_CLIENT_ID);
  const jumaTimes = prayerTimes.jumaEntries
    .map((entry) => entry.khutbaTime)
    .filter((time) => time.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("missing juma times payload");
  }

  util.setIqamaTimes(ids[0], [
    prayerTimes.fajr,
    prayerTimes.zuhr,
    prayerTimes.asr,
    prayerTimes.maghrib,
    prayerTimes.isha,
  ]);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TN/icn-bellevue-masjid-nashville",
  ids,
  run,
};
