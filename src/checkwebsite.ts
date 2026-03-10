import type { CrawlerIds, CrawlerRun } from "./types";
import * as util from "./util";

const CHECK_WEBSITE_TIMES = [
  "check website",
  "check website",
  "check website",
  "check website",
  "check website",
  "check website",
  "check website",
];

export const createCheckWebsiteRun = (ids: CrawlerIds): CrawlerRun => {
  return async () => {
    util.setTimes(ids[0], CHECK_WEBSITE_TIMES);
    return ids;
  };
};
