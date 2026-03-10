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

    if (iqamaTimes.length >= 5) {
      util.setIqamaTimes(ids[0], iqamaTimes);
    } else {
      util.setCheckWebsiteTimes(ids[0]);
    }

    if (jumaTimes.length > 0) {
      util.setJumaTimes(ids[0], jumaTimes);
    }

    return ids;
  };
};
