import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type FridayAwareJamahOptions = {
  fridayJumaParser?: util.TimeMatchParser;
  fridayPlaceholder?: string;
  nonFridayJumaParser: util.TimeMatchParser;
  removeIndexes?: number[];
  selector?: string;
  url?: string;
};

const removeIndexes = (values: string[], indexes?: number[]): string[] => {
  if (!indexes?.length) {
    return values;
  }

  for (const index of [...indexes].sort((a, b) => b - a)) {
    values.splice(index, 1);
  }

  return values;
};

export const createJamahSetTimesRun = (
  ids: CrawlerIds,
  options?: {
    fridayJumaIndex?: number;
    selector?: string;
    url?: string;
  },
): CrawlerRun => {
  return async () => {
    const $ = await util.load(options?.url ?? ids[0]?.url ?? "");
    const iqamaTimes = util.mapToText($, options?.selector ?? ".jamah");

    util.setTimes(ids[0], iqamaTimes);

    if (util.isJumaToday(ids[0]) && options?.fridayJumaIndex !== undefined) {
      util.setJumaTimes(ids[0], [iqamaTimes[options.fridayJumaIndex] ?? ""]);
    }

    return ids;
  };
};

export const createFridayAwareJamahRun = (
  ids: CrawlerIds,
  options: FridayAwareJamahOptions,
): CrawlerRun => {
  return async () => {
    const $ = await util.load(options.url ?? ids[0]?.url ?? "");
    const iqamaTimes = removeIndexes(
      util.mapToText($, options.selector ?? ".jamah"),
      options.removeIndexes,
    );

    if (util.isJumaToday(ids[0])) {
      util.setJumaTimes(
        ids[0],
        util.extractMatchedTimes(
          iqamaTimes[1] ?? "",
          options.fridayJumaParser ?? "matchTimeAmPmG",
        ),
      );
      iqamaTimes[1] = options.fridayPlaceholder ?? "Juma";
    } else {
      util.setJumaTimes(
        ids[0],
        util.extractMatchedTimes(
          iqamaTimes.at(-1) ?? "",
          options.nonFridayJumaParser,
        ),
      );
    }

    util.setIqamaTimes(ids[0], iqamaTimes);

    return ids;
  };
};

export const createAssalamWidgetRun = (
  ids: CrawlerIds,
  url: string,
  options?: {
    selector?: string;
  },
): CrawlerRun => {
  return async () => {
    const $ = await util.load(url);
    const iqamaTimes = util
      .mapToText($, options?.selector ?? ".mptwidgetdiv table td:last-child")
      .filter((text) => /\d{1,2}\s*:\s*\d{1,2}/.test(text));

    iqamaTimes.splice(1, 1);
    util.setIqamaAndTrailingJumaTimes(ids[0], iqamaTimes);

    return ids;
  };
};

export const createFridayJamahOtherwiseTableRun = (
  ids: CrawlerIds,
  options?: {
    fridayJumaIndex?: number;
    fridaySelector?: string;
    url?: string;
    weekdayJumaParser?: util.TimeMatchParser;
    weekdayRemoveIndexes?: number[];
    weekdaySelector?: string;
  },
): CrawlerRun => {
  return async () => {
    const $ = await util.load(options?.url ?? ids[0]?.url ?? "");

    if (util.isJumaToday(ids[0])) {
      const fridayTimes = util.mapToText(
        $,
        options?.fridaySelector ?? ".jamah",
      );

      util.setIqamaTimes(ids[0], fridayTimes);
      util.setJumaTimes(ids[0], [
        fridayTimes[options?.fridayJumaIndex ?? 1] ?? "",
      ]);

      return ids;
    }

    const weekdayTimes = removeIndexes(
      util.mapToText(
        $,
        options?.weekdaySelector ?? ".dptTimetable td:last-child",
      ),
      options?.weekdayRemoveIndexes ?? [1],
    );

    util.setIqamaTimes(ids[0], weekdayTimes);
    util.setJumaTimes(
      ids[0],
      util.extractMatchedTimes(
        weekdayTimes[5] ?? "",
        options?.weekdayJumaParser ?? "matchTimeAmPmG",
      ),
    );

    return ids;
  };
};
