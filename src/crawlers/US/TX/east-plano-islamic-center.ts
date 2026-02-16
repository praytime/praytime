import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c7f52457-b461-44de-9f37-4f3b43aecaf6",
    name: "East Plano Islamic Center",
    url: "http://epicmasjid.org",
    address: "1350 Star Ct, Plano, TX 75074, USA",
    placeId: "ChIJvdyH6-sbTIYREMaa7JQJCsc",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 33.01005,
      longitude: -96.646647,
    },
  },
];

const getTime = ($: cheerio.CheerioAPI, prayer: string): string => {
  const text = $(`div.cl-prayer-flex h4:contains("${prayer}") + h6`)
    .text()
    .trim();
  const match = util.matchTimeAmPm(text)?.[0];
  if (!match) {
    throw new Error(`Failed to parse ${prayer} iqama time`);
  }
  return match;
};

const run = async () => {
  const response = await util.get("http://epicmasjid.org");
  const $ = cheerio.load(response.data);
  const record = ids[0];
  if (!record) {
    throw new Error("No masjid record configured");
  }

  util.setIqamaTimes(record, [
    getTime($, "Fajr"),
    getTime($, "Dhuhr"),
    getTime($, "Asr"),
    getTime($, "Maghrib"),
    getTime($, "Isha"),
  ]);

  const j = util.mapToText($, ".jumuatime table td:nth-child(2)");
  util.setJumaTimes(
    record,
    j.filter(util.matchTimeAmPm).map(util.extractTimeAmPm),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/east-plano-islamic-center",
  ids,
  run,
};
