import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

type MasjidAppRunOptions = {
  fallbackJumaTimes?: string[];
  prayerUrl?: string;
  requireJuma?: boolean;
  resolvePrayerUrl?: () => Promise<string>;
};

export const resolveMasjidAppPrayerUrl = async (
  homepageUrl: string,
  fallbackUrl: string,
): Promise<string> => {
  const homepage = await util.load(homepageUrl);

  return (
    homepage(
      'iframe[src*="themasjidapp.org"][src*="/prayers"], iframe[src*="themasjidapp.net"][src*="/prayers"]',
    )
      .first()
      .attr("src") ?? fallbackUrl
  );
};

export const createMasjidAppRun = (
  ids: CrawlerIds,
  options: MasjidAppRunOptions,
): CrawlerRun => {
  return async () => {
    const prayerUrl = options.prayerUrl ?? (await options.resolvePrayerUrl?.());
    if (!prayerUrl) {
      throw new Error("missing masjid app prayer URL");
    }

    const prayerTimes = await util.loadMasjidAppPrayerTimes(prayerUrl, ids[0]);

    util.setIqamaTimes(ids[0], [
      prayerTimes.fajr,
      prayerTimes.zuhr,
      prayerTimes.asr,
      prayerTimes.maghrib,
      prayerTimes.isha,
    ]);

    const jumaTimes = prayerTimes.juma.slice(0, 3);
    if (jumaTimes.length > 0) {
      util.setJumaTimes(ids[0], jumaTimes);
    } else if (options.requireJuma) {
      throw new Error("missing Juma times on masjid app prayer table");
    } else if (options.fallbackJumaTimes?.length) {
      util.setJumaTimes(ids[0], options.fallbackJumaTimes);
    }

    return ids;
  };
};
