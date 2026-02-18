import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MADINAAPPS_CLIENT_ID = "205";

type MadinaPrayerTime = {
  iqamahTime?: unknown;
};

type MadinaJumaTime = {
  khutbaTime?: unknown;
};

type MadinaJuma = {
  juma1KhutbaTime?: unknown;
  juma2KhutbaTime?: unknown;
  juma3KhutbaTime?: unknown;
};

type MadinaPrayerDay = {
  asr?: MadinaPrayerTime;
  dhuhr?: MadinaPrayerTime;
  fajr?: MadinaPrayerTime;
  isha?: MadinaPrayerTime;
  juma?: MadinaJuma;
  jumaTimes?: MadinaJumaTime[];
  maghrib?: MadinaPrayerTime;
};

type MadinaPrayerResponse = {
  prayerTimes?: MadinaPrayerDay[];
};

const toAmPm = (value: unknown): string =>
  typeof value === "string" ? util.extractTimeAmPm(value) : "";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "745cea37-a6ef-47b0-b583-28f4ff5ca5e7",
    name: "Masjid Bilal Ibn Rabaah",
    url: "https://www.islamstl.org/masjidbilal/",
    timeZoneId: "America/Chicago",
    address: "3843 W Pine Mall Blvd, St. Louis, MO 63108, USA",
    placeId: "ChIJ00aAJbm02IcRYsWM5THX7yw",
    geo: {
      latitude: 38.6377917,
      longitude: -90.2403722,
    },
  },
];
const run = async () => {
  const response = await util.loadJson<MadinaPrayerResponse>(
    `https://services.madinaapps.com/kiosk-rest/clients/${MADINAAPPS_CLIENT_ID}/prayerTimes`,
  );
  const today = response.prayerTimes?.[0];
  if (!today) {
    throw new Error("missing prayer times payload");
  }

  const iqamahTimes = [
    toAmPm(today.fajr?.iqamahTime),
    toAmPm(today.dhuhr?.iqamahTime),
    toAmPm(today.asr?.iqamahTime),
    toAmPm(today.maghrib?.iqamahTime),
    toAmPm(today.isha?.iqamahTime),
  ];
  if (iqamahTimes.some((time) => !time)) {
    throw new Error("incomplete iqamah payload");
  }

  const jumaTimes = (today.jumaTimes ?? [])
    .map((entry) => toAmPm(entry.khutbaTime))
    .filter((time) => time.length > 0);
  if (jumaTimes.length === 0) {
    const fallback = [
      toAmPm(today.juma?.juma1KhutbaTime),
      toAmPm(today.juma?.juma2KhutbaTime),
      toAmPm(today.juma?.juma3KhutbaTime),
    ].filter((time) => time.length > 0);
    jumaTimes.push(...fallback);
  }
  if (jumaTimes.length === 0) {
    throw new Error("missing juma times payload");
  }

  util.setIqamaTimes(ids[0], iqamahTimes);
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MO/masjid-bilal-ibn-rabaah-st-louis",
  ids,
  run,
};
