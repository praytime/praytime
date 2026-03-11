import * as cheerio from "cheerio";
import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const normalizeClock = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const compactMatch = trimmed.match(/^\d{1,2}\s*:\s*\d{2}\s*[ap]$/i);
  if (compactMatch?.[0]) {
    return compactMatch[0].replace(/\s+/g, "");
  }

  return util.extractTimeAmPm(trimmed) || util.extractTime(trimmed);
};

const normalizeIqamaValue = (value: string): string => {
  const trimmed = value.trim();
  if (/^[-\u2013\u2014]+$/.test(trimmed)) {
    return "-";
  }

  return normalizeClock(trimmed);
};

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
      normalizeIqamaValue($("#trFajr > td:nth-child(3)").text()),
      normalizeIqamaValue($("#trDhuhr > td:nth-child(3)").text()),
      normalizeIqamaValue($("#trAsr > td:nth-child(3)").text()),
      normalizeIqamaValue($("#trMaghrib > td:nth-child(3)").text()),
      normalizeIqamaValue($("#trIsha > td:nth-child(3)").text()),
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
