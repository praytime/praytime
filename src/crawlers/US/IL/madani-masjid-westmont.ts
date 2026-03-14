import {
  extractSunsetOffsetMinutes,
  sunsetOffsetClock,
} from "../../../suntime";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2761a944-e1bc-4d85-8581-55a4d7536ce2",
    name: "Madani Masjid",
    url: "https://www.madanimasjid.org",
    address: "40 North Lincoln Street, Westmont, IL, 60559, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJVVXlUllODogRulXf-qOuXyw",
    geo: {
      latitude: 41.797492,
      longitude: -87.977081,
    },
  },
];

const PRAYER_TIMES_URL = new URL("/prayer-times", ids[0].url).toString();

const normalizeLine = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const lineValue = (value: string): string =>
  value.replace(/^[^:-]+[:-]\s*/, "").trim();

const loadPrayerLines = async (): Promise<string[]> => {
  const $ = await util.load(PRAYER_TIMES_URL);
  const prayerBlock = $(".sqs-html-content")
    .toArray()
    .find((element) => {
      const lines = util.mapToText($, "p", element).map(normalizeLine);
      return (
        lines.some((value) => /^fajr\b/i.test(value)) &&
        lines.some((value) => /^jummah prayer$/i.test(value))
      );
    });

  if (!prayerBlock) {
    throw new Error("missing Madani Masjid prayer times block");
  }

  const lines = util
    .mapToText($, "p", prayerBlock)
    .map(normalizeLine)
    .filter(Boolean);
  if (lines.length === 0) {
    throw new Error("missing Madani Masjid prayer time rows");
  }

  return lines;
};

const findLine = (
  lines: string[],
  label: RegExp,
  description: string,
): string => {
  const line = lines.find((value) => label.test(value));
  if (!line) {
    throw new Error(`missing Madani Masjid ${description} line`);
  }

  return line;
};

const parseIqama = (
  lines: string[],
  label: RegExp,
  description: string,
): string => {
  const value = lineValue(findLine(lines, label, description));
  const parsed = util.extractTimeAmPm(value) || util.extractTime(value);
  if (parsed) {
    return parsed;
  }

  const sunsetOffsetMinutes = extractSunsetOffsetMinutes(value);
  if (sunsetOffsetMinutes !== null) {
    return sunsetOffsetClock(ids[0], sunsetOffsetMinutes);
  }

  throw new Error(`unsupported Madani Masjid ${description} value: ${value}`);
};

const parseJuma = (lines: string[]): string => {
  const khutbahLine =
    lines.find((value) => /^khutbah\b/i.test(value)) ??
    findLine(lines, /\bkhutbah\b/i, "khutbah");
  const jumaTime =
    util.extractTimeAmPm(lineValue(khutbahLine)) ||
    util.extractTime(lineValue(khutbahLine));

  if (!jumaTime) {
    throw new Error(`unsupported Madani Masjid khutbah value: ${khutbahLine}`);
  }

  return jumaTime;
};

const run = async () => {
  const lines = await loadPrayerLines();

  util.setIqamaTimes(ids[0], [
    parseIqama(lines, /^fajr\b/i, "Fajr"),
    parseIqama(lines, /^(dhuhr|zuhr)\b/i, "Dhuhr"),
    parseIqama(lines, /^asr\b/i, "Asr"),
    parseIqama(lines, /^(maghreb|maghrib)\b/i, "Maghrib"),
    parseIqama(lines, /^isha\b/i, "Isha"),
  ]);
  util.setJumaTimes(ids[0], [parseJuma(lines)]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/madani-masjid-westmont",
  ids,
  run,
};
