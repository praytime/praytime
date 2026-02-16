import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const FIREBASE_DB = "https://icor-pwa-default-rtdb.firebaseio.com";

type PrayerRow = {
  asr?: string;
  day?: number | string;
  dhuhr?: string;
  fajr?: string;
  isha?: string;
  maghrib?: string;
};

type JummahRow = {
  Jummah_Time?: string;
  status?: number | string;
};

const extractClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return util.extractTimeAmPm(value) || util.extractTime(value);
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "184063c6-dac2-4c22-b215-81ca4bb58462",
    name: "Islamic Center of Redmond",
    url: "https://www.redmondmosque.org/",
    timeZoneId: "America/Los_Angeles",
    address: "18080 NE 68th St, Redmond, WA 98052, USA",
    placeId: "ChIJTUmMm79ykFQRCzjM_61h-Bg",
    geo: {
      latitude: 47.66775579999999,
      longitude: -122.0978881,
    },
  },
];
const run = async () => {
  const month = util.strftime("%B", ids[0]);
  const day = Number.parseInt(util.strftime("%d", ids[0]), 10);
  if (!Number.isFinite(day)) {
    throw new Error("failed to derive local day");
  }

  const monthlyPrayers = await util.loadJson<Record<string, PrayerRow>>(
    `${FIREBASE_DB}/prayer/iant/${encodeURIComponent(month)}.json`,
  );
  const todayPrayer = Object.values(monthlyPrayers ?? {}).find(
    (row) => Number(row?.day) === day,
  );
  if (!todayPrayer) {
    throw new Error(`missing prayer entry for ${month} ${day}`);
  }

  const iqamaTimes = [
    extractClock(todayPrayer.fajr),
    extractClock(todayPrayer.dhuhr),
    extractClock(todayPrayer.asr),
    extractClock(todayPrayer.maghrib),
    extractClock(todayPrayer.isha),
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error("incomplete iqamah times");
  }
  util.setIqamaTimes(ids[0], iqamaTimes);

  const jummahRows = await util.loadJson<JummahRow[]>(
    `${FIREBASE_DB}/jummah/iant.json`,
  );
  const jumahTimes = (Array.isArray(jummahRows) ? jummahRows : [])
    .filter((row) => String(row.status ?? "") === "1")
    .map((row) => extractClock(row.Jummah_Time))
    .filter((time) => time.length > 0);
  if (jumahTimes.length === 0) {
    throw new Error("failed to parse jummah times");
  }
  util.setJumaTimes(ids[0], jumahTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-redmond-redmond",
  ids,
  run,
};
