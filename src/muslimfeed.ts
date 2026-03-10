import * as cheerio from "cheerio";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const normalizeClock = (value: string): string =>
  util.extractTimeAmPm(value) || util.extractTime(value);

export const createMuslimFeedRun = (
  ids: CrawlerIds,
  muslimFeedId: string,
): CrawlerRun => {
  return async () => {
    const response = await util.get<string>(
      `http://www.muslimfeed.com/timesframe.aspx?mi=${encodeURIComponent(muslimFeedId)}`,
    );
    if (typeof response.data !== "string") {
      throw new Error(`unexpected MuslimFeed response for ${muslimFeedId}`);
    }

    const $ = cheerio.load(response.data);
    const iqamaTimes = [
      normalizeClock($("#trFajr > td:nth-child(3)").text().trim()),
      normalizeClock($("#trDhuhr > td:nth-child(3)").text().trim()),
      normalizeClock($("#trAsr > td:nth-child(3)").text().trim()),
      normalizeClock($("#trMaghrib > td:nth-child(3)").text().trim()),
      normalizeClock($("#trIsha > td:nth-child(3)").text().trim()),
    ];
    if (iqamaTimes.some((value) => value.length === 0)) {
      throw new Error(`incomplete MuslimFeed iqama times for ${muslimFeedId}`);
    }

    const jumaTime = normalizeClock(
      $("#tblDailyTimes > tbody > tr:nth-child(9) > td:nth-child(2)")
        .text()
        .trim(),
    );
    if (!jumaTime) {
      throw new Error(`missing MuslimFeed Juma time for ${muslimFeedId}`);
    }

    util.setIqamaTimes(ids[0], iqamaTimes);
    util.setJumaTimes(ids[0], [jumaTime]);

    return ids;
  };
};
