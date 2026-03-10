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
        const time = normalizeSpace($(item).find(".num").first().text());
        const label = normalizeSpace($(item).text().replace(time, ""));
        if (!time || !jumaLabelPattern.test(label)) {
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
