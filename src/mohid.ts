import type { Element } from "domhandler";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type MohidWidgetOptions = {
  jumaLabelPattern?: RegExp;
  jumaLimit?: number;
};

const normalizeSpace = (text: string): string =>
  text.replace(/\s+/g, " ").trim();

const uniqueTimes = (times: string[]): string[] =>
  Array.from(new Set(times.filter((time) => time.length > 0)));

const extractMohidWidgetRowTime = (
  $: Awaited<ReturnType<typeof util.load>>,
  item: Element,
): string => {
  const explicitTime = normalizeSpace(
    $(item).find(".prayer_iqama_div, .num").first().text(),
  );
  if (explicitTime) {
    return explicitTime;
  }

  const rowText = normalizeSpace($(item).text());
  return util.extractTimeAmPm(rowText) || util.extractTime(rowText);
};

export const loadMohidWidgetTimes = async (
  url: string,
  options?: MohidWidgetOptions,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const $ = await util.load(url);

  const iqamaTimes = util
    .mapToText($, "#daily .prayer_iqama_div")
    .map(normalizeSpace)
    .slice(1, 6);
  if (iqamaTimes.length !== 5 || iqamaTimes.some((value) => !value)) {
    throw new Error("failed to parse mohid iqama timings");
  }

  const jumaLabelPattern = options?.jumaLabelPattern ?? /khutba/i;
  const jumaTimes = uniqueTimes(
    $("#jummah li")
      .toArray()
      .flatMap((item) => {
        const rowText = normalizeSpace($(item).text());
        const time = extractMohidWidgetRowTime($, item);
        const label = normalizeSpace(rowText.replace(time, ""));
        if (!time || !jumaLabelPattern.test(label || rowText)) {
          return [];
        }

        return [time];
      }),
  );
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse mohid juma timings");
  }

  return {
    iqamaTimes,
    jumaTimes: jumaTimes.slice(0, options?.jumaLimit ?? 3),
  };
};

export const createMohidWidgetRun = (
  ids: CrawlerIds,
  url: string,
  options?: MohidWidgetOptions,
): CrawlerRun => {
  return async () => {
    const { iqamaTimes, jumaTimes } = await loadMohidWidgetTimes(url, options);

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  };
};

export const loadMohidListTimes = async (
  url: string,
  options?: MohidWidgetOptions,
): Promise<{ iqamaTimes: string[]; jumaTimes: string[] }> => {
  const $ = await util.load(url);
  const prayers = new Map<util.StandardPrayerKey, string>();
  const jumaTimes: string[] = [];
  const jumaLabelPattern = options?.jumaLabelPattern ?? /friday iqama/i;

  $(".list li").each((_, row) => {
    const rowText = normalizeSpace($(row).text());
    if (!rowText) {
      return;
    }

    const iqama = normalizeSpace(
      $(row).find(".prayer_iqama_div").first().text(),
    );
    const prayerKey = util.getStandardPrayerKey(rowText);

    if (prayerKey && iqama) {
      prayers.set(prayerKey, iqama);
      return;
    }

    if (iqama && jumaLabelPattern.test(rowText)) {
      jumaTimes.push(iqama);
    }
  });

  const iqamaTimes = util.requireStandardPrayerTimes(
    prayers,
    "failed to parse mohid list iqama timings",
  );
  const uniqueJumaTimes = uniqueTimes(jumaTimes);

  return {
    iqamaTimes,
    jumaTimes: uniqueJumaTimes.slice(0, options?.jumaLimit ?? 3),
  };
};

export const createMohidListRun = (
  ids: CrawlerIds,
  url: string,
  options?: MohidWidgetOptions,
): CrawlerRun => {
  return async () => {
    const { iqamaTimes, jumaTimes } = await loadMohidListTimes(url, options);

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  };
};
