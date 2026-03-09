import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MADINAAPPS_CLIENT_ID = "40";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1e8965a1-0922-44fc-8d26-e186cada1e0b",
    name: "Islamic Center of Maryland",
    url: "http://www.icomd.org/",
    timeZoneId: "America/New_York",
    address: "19411 Woodfield Rd, Gaithersburg, MD 20879, USA",
    placeId: "ChIJyy3PmHfTt4kR1xQsf_drUQ8",
    geo: {
      latitude: 39.174688,
      longitude: -77.150639,
    },
  },
  {
    uuid4: "9802ce2e-582c-4072-b2d4-f587885fe84e",
    name: "Islamic Center of Maryland Juma: Casey Community Center",
    url: "http://www.icomd.org/",
    timeZoneId: "America/New_York",
    address: "810 S Frederick Ave, Gaithersburg, MD 20877, USA",
    placeId: "ChIJ2ySCNLjSt4kRlIPMuVVjvlI",
    geo: {
      latitude: 39.12402899999999,
      longitude: -77.181646,
    },
  },
  {
    uuid4: "5feaf2da-0d64-4f83-a24c-981759497152",
    name: "Islamic Center of Maryland Juma: Rollins Congressional Club",
    url: "http://www.icomd.org/",
    timeZoneId: "America/New_York",
    address: "1621 Martha Terrace, Rockville, MD 20852, USA",
    placeId: "ChIJN2E050zMt4kRi0PnfIgqNO8",
    geo: {
      latitude: 39.0592651,
      longitude: -77.13356780000001,
    },
  },
];

const selectKhutbaTimes = (
  prayerTimes: Awaited<ReturnType<typeof util.loadMadinaAppsPrayerTimes>>,
  titleNeedle: string,
): string[] =>
  prayerTimes.jumaEntries
    .filter((entry) =>
      entry.title.toLowerCase().includes(titleNeedle.toLowerCase()),
    )
    .map((entry) => entry.khutbaTime)
    .filter((time) => time.length > 0);

const run = async () => {
  const prayerTimes =
    await util.loadMadinaAppsPrayerTimes(MADINAAPPS_CLIENT_ID);
  const icmJumaTimes = selectKhutbaTimes(prayerTimes, "icm");
  const caseyJumaTimes = selectKhutbaTimes(prayerTimes, "casey");
  const rollinsJumaTimes = selectKhutbaTimes(prayerTimes, "rollins");
  if (
    icmJumaTimes.length === 0 ||
    caseyJumaTimes.length === 0 ||
    rollinsJumaTimes.length === 0
  ) {
    throw new Error("missing location-specific juma times payload");
  }

  util.setIqamaTimes(ids[0], [
    prayerTimes.fajr,
    prayerTimes.zuhr,
    prayerTimes.asr,
    prayerTimes.maghrib,
    prayerTimes.isha,
  ]);
  util.setJumaTimes(ids[0], icmJumaTimes.slice(0, 3));
  util.setJumaTimes(ids[1], caseyJumaTimes.slice(0, 3));
  util.setJumaTimes(ids[2], rollinsJumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/islamic-center-of-maryland-gaithersburg",
  ids,
  run,
};
