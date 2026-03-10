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
    const iqamaTimes = parseSelectorValues($, options.iqama);

    if ((options.mode ?? "setIqamaTimes") === "setTimes" && !options.juma) {
      util.setTimes(ids[0], iqamaTimes);
      return ids;
    }

    util.setIqamaTimes(ids[0], iqamaTimes);

    const jumaTimes = options.juma
      ? parseSelectorValues($, options.juma)
      : (options.jumaDefault ?? []);

    util.setJumaTimes(
      ids[0],
      jumaTimes.length > 0 ? jumaTimes : options.jumaDefault,
    );

    return ids;
  };
};
