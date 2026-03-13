import { calculatePrayerTimes } from "@masaajid/prayer-times";
import type { MasjidRecord } from "./types";
import * as util from "./util";

const buildLocalNoonDate = (timeZoneId: string): Date => {
  const year = Number.parseInt(util.strftime("%Y", { timeZoneId }), 10);
  const month = Number.parseInt(util.strftime("%m", { timeZoneId }), 10);
  const day = Number.parseInt(util.strftime("%d", { timeZoneId }), 10);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
};

const formatLocalClock = (date: Date, timeZoneId: string): string =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    timeZone: timeZoneId,
  }).format(date);

export const sunsetOffsetClock = (
  record: Pick<MasjidRecord, "geo" | "timeZoneId">,
  minutesToAdd: number,
): string => {
  const date = buildLocalNoonDate(record.timeZoneId);
  const sunset = calculatePrayerTimes(
    {
      date,
      fajr: 19,
      highLatitudeRule: "AngleBased",
      isha: 10,
      location: [record.geo.latitude, record.geo.longitude],
      method: "Custom",
      timezone: record.timeZoneId,
    },
    date,
  ).sunset;

  return formatLocalClock(
    new Date(sunset.getTime() + minutesToAdd * 60_000),
    record.timeZoneId,
  );
};

export const extractSunsetOffsetMinutes = (value: string): number | null => {
  const compactMatch = value.match(/sunset\s*([+-])\s*(\d+)\s*min/i);
  if (compactMatch?.[1] && compactMatch[2]) {
    const minutes = Number.parseInt(compactMatch[2], 10);
    if (Number.isFinite(minutes)) {
      return compactMatch[1] === "-" ? -minutes : minutes;
    }
  }

  const phraseMatch = value.match(/(\d+)\s*min(?:ute)?s?\s*after\s*sunset/i);
  if (!phraseMatch?.[1]) {
    return null;
  }

  const minutes = Number.parseInt(phraseMatch[1], 10);
  return Number.isFinite(minutes) ? minutes : null;
};
