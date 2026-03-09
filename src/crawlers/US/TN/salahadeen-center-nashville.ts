import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MADINAAPPS_CLIENT_ID = "53";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "012ed6d8-6c79-4374-a9ac-aecf51863469",
    name: "Salahadeen Center",
    url: "http://www.scntn.org/",
    timeZoneId: "America/Chicago",
    address: "364 Elysian Fields Ct, Nashville, TN 37211, USA",
    placeId: "ChIJ5WmZn51vZIgR-gHAT0SJiqk",
    geo: {
      latitude: 36.0871618,
      longitude: -86.728723,
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
  name: "US/TN/salahadeen-center-nashville",
  ids,
  run,
};
