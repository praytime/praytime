import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const COMPACT_TIME_RX = /^(\d{1,2})(\d{2})([ap]\.?m\.?)$/i;

export const parseMasjidBoxTime = (value: string): string => {
  const extracted = util.extractTimeAmPm(value);
  if (extracted) {
    return extracted;
  }

  const match = value.replace(/\s+/g, "").match(COMPACT_TIME_RX);
  if (!match) {
    return "";
  }

  const [, hourText, minuteText, ampmText] = match;
  if (!hourText || !minuteText || !ampmText) {
    return "";
  }

  return `${hourText}:${minuteText}${ampmText.toUpperCase().replace(/\./g, "")}`;
};

const uniqueTimes = (times: string[]): string[] =>
  Array.from(new Set(times.filter((time) => time.length > 0)));

export const loadMasjidBoxTimes = async (
  url: string,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const $ = await util.load(url);

  const iqamaTimes = uniqueTimes(
    util.mapToText($, "div.iqamah div.time").map(parseMasjidBoxTime),
  );
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse masjidbox iqama timings");
  }

  const jumaTimes = uniqueTimes(
    util
      .mapToText($, "div.jumuah-times div.athan-time")
      .map(parseMasjidBoxTime),
  );
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse masjidbox juma timings");
  }

  return {
    iqamaTimes: iqamaTimes.slice(0, 5),
    jumaTimes: jumaTimes.slice(0, 3),
  };
};

export const createMasjidBoxRun = (
  ids: CrawlerIds,
  url: string,
): CrawlerRun => {
  return async () => {
    const { iqamaTimes, jumaTimes } = await loadMasjidBoxTimes(url);

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  };
};
