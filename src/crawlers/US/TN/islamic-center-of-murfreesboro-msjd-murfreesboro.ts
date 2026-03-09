import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MADINAAPPS_CLIENT_ID = "46";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3018b643-7bad-4f51-9e9e-5732fc917460",
    name: "Islamic Center of Murfreesboro مسجد",
    url: "http://icmtn.org/",
    timeZoneId: "America/Chicago",
    address: "2605 Veals Rd, Murfreesboro, TN 37127, USA",
    placeId: "ChIJKW-V5iv5Y4gRdqidxwFUPJY",
    geo: {
      latitude: 35.813789,
      longitude: -86.349572,
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
  name: "US/TN/islamic-center-of-murfreesboro-msjd-murfreesboro",
  ids,
  run,
};
