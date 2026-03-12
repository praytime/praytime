import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

export const createAwqatPageRun = (
  ids: CrawlerIds,
  url: string,
): CrawlerRun => {
  return async () => {
    const $ = await util.load(url);

    $('tr:contains("Zawal")').remove();
    $('tr:contains("Sunrise")').remove();

    const iqamaTimes = util.mapToText($, ".prayer_entry:last-child");
    const jumaTimes = util.mapToText($, ".prayer_entry:nth-child(2)").slice(5);

    if (iqamaTimes.length < 5) {
      throw new Error(`failed to parse awqat iqama timings from ${url}`);
    }
    util.setIqamaTimes(ids[0], iqamaTimes);

    if (jumaTimes.length > 0) {
      util.setJumaTimes(ids[0], jumaTimes);
    }

    return ids;
  };
};
