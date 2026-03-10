import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type MasjidalRunOptions = {
  jumaCount?: number;
  jumaMode?: "none" | "setJumaTimes" | "setTimes";
  normalizeJumaTimes?: boolean;
  requireJuma?: boolean;
};

const masjidalJumaTimes = (
  iqama: Awaited<ReturnType<typeof util.loadMasjidalIqama>>,
  options?: MasjidalRunOptions,
): string[] => {
  const times = [iqama.jummah1, iqama.jummah2, iqama.jummah3];
  const normalized = options?.normalizeJumaTimes
    ? times.map((value) => util.extractTimeAmPm(value))
    : times;

  return normalized.filter((value): value is string => Boolean(value));
};

export const createMasjidalRun = (
  ids: CrawlerIds,
  masjidId: string,
  options?: MasjidalRunOptions,
): CrawlerRun => {
  return async () => {
    const iqama = await util.loadMasjidalIqama(masjidId);
    const iqamaTimes = [
      iqama.fajr,
      iqama.zuhr,
      iqama.asr,
      iqama.maghrib,
      iqama.isha,
    ];
    const jumaTimes = masjidalJumaTimes(iqama, options).slice(
      0,
      options?.jumaCount ?? 3,
    );

    if (options?.requireJuma && jumaTimes.length === 0) {
      throw new Error(`missing masjidal juma times for ${masjidId}`);
    }

    if ((options?.jumaMode ?? "setTimes") === "none") {
      util.setIqamaTimes(ids[0], iqamaTimes);
      return ids;
    }

    if (options?.jumaMode === "setJumaTimes") {
      util.setIqamaTimes(ids[0], iqamaTimes);
      util.setJumaTimes(ids[0], jumaTimes);
      return ids;
    }

    util.setTimes(ids[0], [...iqamaTimes, ...jumaTimes]);
    return ids;
  };
};
