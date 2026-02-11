// @ts-nocheck

import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "7c6a201a-c4e5-4203-b6af-4f495eede526",
    name: "Islamic Center of New Mexico (ICNM)",
    url: "http://www.icnmabq.com/",
    timeZoneId: "America/Denver",
    address: "1100 Yale Blvd SE, Albuquerque, NM 87106, USA",
    placeId: "ChIJzVJIwHsLIocRkCrgX3ez2SU",
    geo: {
      latitude: 35.0682941,
      longitude: -106.6216504,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  // timetable embedded in iframe
  const $srcdoc = cheerio.load($("#iframe-47608").attr("srcdoc"));

  util.setTimes(ids[0], util.mapToText($srcdoc, "td:last-child"));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NM/islamic-center-of-new-mexico-icnm-albuquerque",
  ids,
  run,
};
