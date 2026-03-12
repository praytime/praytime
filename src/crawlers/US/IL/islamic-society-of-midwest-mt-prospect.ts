import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ISOM_BLOCK_RX = /Prayer Time:\s*<br><br>([\s\S]*?)<\/p>/i;

const parseIsomIqama = (html: string, label: string): string => {
  const block = html.replaceAll("&nbsp;", " ").match(ISOM_BLOCK_RX)?.[1] ?? "";
  const value =
    new RegExp(`${label}\\s*:?\\s*([^<]+)`, "i").exec(block)?.[1]?.trim() ?? "";
  const parsed = util.extractTimeAmPm(value) || util.extractTime(value);

  if (!parsed) {
    throw new Error(`unsupported ISOM ${label} iqama value: ${value}`);
  }

  return parsed;
};

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f9d2894e-cf77-43e7-86cc-d5f58323477d",
    name: "Islamic Society of Midwest",
    url: "http://islamicsom.org/",
    timeZoneId: "America/Chicago",
    address: "501 Midway Dr, Mt Prospect, IL 60056, USA",
    placeId: "ChIJXRQ2B9qwD4gRYtTJ-nKIIdA",
    geo: {
      latitude: 42.025141,
      longitude: -87.9431469,
    },
  },
];
const run = async () => {
  const { data: html } = await util.get<string>(ids[0].url);

  util.setIqamaTimes(ids[0], [
    parseIsomIqama(html, "Fajr"),
    parseIsomIqama(html, "Zuhr"),
    parseIsomIqama(html, "Asr"),
    parseIsomIqama(html, "Maghrib"),
    parseIsomIqama(html, "Isha"),
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-society-of-midwest-mt-prospect",
  ids,
  run,
};
