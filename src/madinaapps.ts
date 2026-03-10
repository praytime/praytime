import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type MadinaAppsRunOptions = {
  jumaLimit?: number;
  jumaSource?: "iqamahTime" | "khutbaTime";
  requireJuma?: boolean;
};

export const createMadinaAppsRun = (
  ids: CrawlerIds,
  clientId: string,
  options?: MadinaAppsRunOptions,
): CrawlerRun => {
  return async () => {
    const prayerTimes = await util.loadMadinaAppsPrayerTimes(clientId);
    const jumaSource = options?.jumaSource ?? "khutbaTime";
    const jumaTimes = prayerTimes.jumaEntries
      .map((entry) => entry[jumaSource])
      .filter((time) => time.length > 0)
      .slice(0, options?.jumaLimit ?? 3);

    if ((options?.requireJuma ?? true) && jumaTimes.length === 0) {
      throw new Error("missing juma times payload");
    }

    util.setIqamaTimes(ids[0], [
      prayerTimes.fajr,
      prayerTimes.zuhr,
      prayerTimes.asr,
      prayerTimes.maghrib,
      prayerTimes.isha,
    ]);
    util.setJumaTimes(ids[0], jumaTimes);

    return ids;
  };
};
