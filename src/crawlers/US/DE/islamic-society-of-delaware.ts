import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

interface DailyPrayerTimes {
  AsrIqama?: unknown;
  DhuhrIqama?: unknown;
  FajrIqama?: unknown;
  IshaIqama?: unknown;
  Maghrib?: unknown;
  MaghribIqama?: unknown;
  ZuharIqama?: unknown;
}

const normalizeClock = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
};

const getDatePart = (format: string, record: { timeZoneId: string }): number =>
  Number.parseInt(util.strftime(format, record), 10);

const isDstSeason = (month: number, day: number): boolean =>
  (month > 3 && month < 10) ||
  (month === 3 && day >= 13) ||
  (month === 10 && day <= 30);

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a5d9ddbe-664f-4064-80c3-3cb07f7335b7",
    name: "Masjid Ibrahim",
    url: "https://myisd.org/",
    timeZoneId: "America/New_York",
    address: "28 Salem Church Rd #2934, Newark, DE 19713, USA",
    placeId: "ChIJ_T8wFroAx4kRrT4wHeUO1rk",
    geo: {
      latitude: 39.6759083,
      longitude: -75.69621839999999,
    },
  },
];
const run = async () => {
  const month = getDatePart("%m", ids[0]);
  const day = getDatePart("%d", ids[0]);
  const key = `${month}-${day}`;

  const data = await util.loadJson<Record<string, DailyPrayerTimes>>(
    "https://myisd.org/assets/prayer-times-2026.json",
  );
  const d = data?.[key];
  if (!d || typeof d !== "object") {
    throw new Error(`missing prayer-times entry for ${key}`);
  }

  const iqamaTimes = [
    normalizeClock(d.FajrIqama),
    normalizeClock(d.DhuhrIqama ?? d.ZuharIqama),
    normalizeClock(d.AsrIqama),
    normalizeClock(d.MaghribIqama ?? d.Maghrib),
    normalizeClock(d.IshaIqama),
  ];
  if (iqamaTimes.some((time) => !time)) {
    throw new Error(`incomplete iqama times for ${key}`);
  }

  util.setIqamaTimes(ids[0], iqamaTimes);

  // Site script uses this fixed DST window to shift Jumuah schedule.
  const jumaTimes = isDstSeason(month, day)
    ? ["1:40 PM", "2:40 PM"]
    : ["12:30 PM", "1:40 PM"];
  util.setJumaTimes(ids[0], jumaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/DE/islamic-society-of-delaware",
  ids,
  run,
};
