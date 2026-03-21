import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MADINAAPPS_CLIENT_ID = "53";
const MADINAAPPS_PRAYER_TIMES_URL = `https://services.madinaapps.com/kiosk-rest/clients/${MADINAAPPS_CLIENT_ID}/prayerTimes`;

type MadinaAppsPrayerDay = {
  asr?: { iqamahTime?: unknown } | null;
  dhuhr?: { iqamahTime?: unknown } | null;
  fajr?: { iqamahTime?: unknown } | null;
  isha?: { iqamahTime?: unknown } | null;
  juma?: {
    juma1KhutbaTime?: unknown;
    juma2KhutbaTime?: unknown;
    juma3KhutbaTime?: unknown;
  } | null;
  jumaTimes?: Array<{
    khutbaTime?: unknown;
  }> | null;
  maghrib?: { iqamahTime?: unknown } | null;
};

type MadinaAppsPrayerResponse = {
  prayerTimes?: MadinaAppsPrayerDay[] | null;
};

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
export const crawler: CrawlerModule = {
  name: "US/TN/salahadeen-center-nashville",
  ids,
  run: async () => {
    const response = await util.loadJson<MadinaAppsPrayerResponse>(
      MADINAAPPS_PRAYER_TIMES_URL,
    );
    const today = Array.isArray(response.prayerTimes)
      ? response.prayerTimes[0]
      : undefined;
    if (!today) {
      throw new Error("missing MadinaApps prayer times payload");
    }

    const dailyIqamaTimes = [
      util.normalizeLooseClock(today.fajr?.iqamahTime),
      util.normalizeLooseClock(today.dhuhr?.iqamahTime),
      util.normalizeLooseClock(today.asr?.iqamahTime),
      util.normalizeLooseClock(today.maghrib?.iqamahTime),
      util.normalizeLooseClock(today.isha?.iqamahTime),
    ];
    const hasAnyDailyIqama = dailyIqamaTimes.some((value) => value.length > 0);
    const hasAllDailyIqama = dailyIqamaTimes.every((value) => value.length > 0);
    if (hasAnyDailyIqama && !hasAllDailyIqama) {
      throw new Error("partial MadinaApps iqamah payload");
    }

    const jumaTimes = (
      Array.isArray(today.jumaTimes) && today.jumaTimes.length > 0
        ? today.jumaTimes.map((entry) =>
            util.normalizeLooseClock(entry.khutbaTime),
          )
        : [
            util.normalizeLooseClock(today.juma?.juma1KhutbaTime),
            util.normalizeLooseClock(today.juma?.juma2KhutbaTime),
            util.normalizeLooseClock(today.juma?.juma3KhutbaTime),
          ]
    ).filter((value): value is string => Boolean(value));
    if (jumaTimes.length === 0) {
      throw new Error("missing juma times payload");
    }

    if (hasAllDailyIqama) {
      util.setIqamaTimes(ids[0], dailyIqamaTimes);
    } else {
      // The live MadinaApps payload currently omits all five daily iqamah
      // fields, so fail closed while preserving the published Jumu'ah slots.
      util.setIqamaTimes(ids[0], [
        "check website",
        "check website",
        "check website",
        "check website",
        "check website",
      ]);
    }
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  },
};
