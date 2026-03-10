import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const normalizeClock = (value: string): string =>
  util.extractTimeAmPm(value) || util.extractTime(value);

export const createFivePrayersRun = (
  ids: CrawlerIds,
  displayId: string,
): CrawlerRun => {
  return async () => {
    const $ = await util.load(
      `http://fiveprayers.org/display/index.php?id=${encodeURIComponent(displayId)}`,
    );

    const iqamaTimes = util
      .mapToText($, "td[id$=Iq]")
      .map(normalizeClock)
      .filter((value) => value.length > 0);
    if (iqamaTimes.length < 5) {
      throw new Error(`incomplete fiveprayers iqama times for ${displayId}`);
    }

    const jumaTimes = util
      .mapToText($, "td#fdp")
      .map(normalizeClock)
      .filter((value) => value.length > 0);
    if (jumaTimes.length === 0) {
      throw new Error(`missing fiveprayers Juma times for ${displayId}`);
    }

    util.setIqamaTimes(ids[0], iqamaTimes.slice(0, 5));
    util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

    return ids;
  };
};
