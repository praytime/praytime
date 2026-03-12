import type { CheerioAPI } from "cheerio";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type SelectorParser =
  | "raw"
  | "extractTime"
  | "extractTimeAmPm"
  | "matchTimeG"
  | "matchTimeAmPmG";

type SelectorParseOptions = {
  emptyValue?: string;
  filterPattern?: RegExp;
  limit?: number;
  parser?: SelectorParser;
  removeIndexes?: number[];
  selector: string;
  splitPattern?: RegExp | string;
};

type SelectorRunOptions = {
  iqama: SelectorParseOptions;
  juma?: SelectorParseOptions;
  jumaDefault?: string[];
  mode?: "setIqamaTimes" | "setTimes";
  url?: string;
};

const parseValue = (text: string, parser: SelectorParser): string[] => {
  if (parser === "raw") {
    return [text];
  }
  if (parser === "extractTime") {
    const value = util.extractTime(text);
    return value ? [value] : [];
  }
  if (parser === "extractTimeAmPm") {
    const value = util.extractTimeAmPm(text) || util.extractTime(text);
    return value ? [value] : [];
  }
  if (parser === "matchTimeG") {
    return [...(util.matchTimeG(text) ?? [])];
  }

  return [...(util.matchTimeAmPmG(text) ?? util.matchTimeG(text) ?? [])];
};

const parseSelectorValues = (
  $: CheerioAPI,
  options: SelectorParseOptions,
): string[] => {
  const values = util
    .mapToText($, options.selector)
    .filter((text) =>
      options.filterPattern ? options.filterPattern.test(text) : true,
    )
    .flatMap((text) =>
      options.splitPattern ? text.split(options.splitPattern) : [text],
    )
    .flatMap((text) => parseValue(text, options.parser ?? "raw"))
    .map((value) => value.trim())
    .map((value) => (value.length === 0 ? (options.emptyValue ?? "") : value));

  if (options.removeIndexes?.length) {
    for (const index of [...options.removeIndexes].sort((a, b) => b - a)) {
      values.splice(index, 1);
    }
  }

  return values
    .filter((value) => value.length > 0)
    .slice(0, options.limit ?? values.length);
};

export const createSelectorRun = (
  ids: CrawlerIds,
  options: SelectorRunOptions,
): CrawlerRun => {
  return async () => {
    const $ = await util.load(options.url ?? ids[0]?.url ?? "");
    const embeddedTimes = util.extractEmbeddedPrayerTimesFromHtml($, $.html());
    let iqamaTimes = parseSelectorValues($, options.iqama);
    const sourceUrl = options.url ?? ids[0]?.url ?? "";

    if ((options.mode ?? "setIqamaTimes") === "setTimes" && !options.juma) {
      if (iqamaTimes.length < 5 && embeddedTimes) {
        iqamaTimes = [...embeddedTimes.iqamaTimes, ...embeddedTimes.jumaTimes];
      }
      if (iqamaTimes.length < 5) {
        throw new Error(`failed to parse selector times from ${sourceUrl}`);
      }

      util.setTimes(ids[0], iqamaTimes);
      return ids;
    }

    if (iqamaTimes.length < 5 && embeddedTimes) {
      iqamaTimes = embeddedTimes.iqamaTimes;
    }
    if (iqamaTimes.length < 5) {
      throw new Error(`failed to parse selector iqama times from ${sourceUrl}`);
    }

    util.setIqamaTimes(ids[0], iqamaTimes);

    let jumaTimes = options.juma
      ? parseSelectorValues($, options.juma)
      : (options.jumaDefault ?? []);
    if (jumaTimes.length === 0 && embeddedTimes?.jumaTimes.length) {
      jumaTimes = embeddedTimes.jumaTimes;
    }

    util.setJumaTimes(
      ids[0],
      jumaTimes.length > 0 ? jumaTimes : options.jumaDefault,
    );

    return ids;
  };
};
