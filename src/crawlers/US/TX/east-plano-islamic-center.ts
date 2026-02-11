// @ts-nocheck

import axios from "axios";
import * as cheerio from "cheerio";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
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
const run = async () => {
  const response = await axios.get("http://epicmasjid.org");
  const $ = cheerio.load(response.data);

  util.setIqamaTimes(ids[0], [
    $('div.cl-prayer-flex h4:contains("Fajr") + h6')
      .text()
      .match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Dhuhr") + h6')
      .text()
      .match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Asr") + h6')
      .text()
      .match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Maghrib") + h6')
      .text()
      .match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
    $('div.cl-prayer-flex h4:contains("Isha") + h6')
      .text()
      .match(/(\d{1,2}:\d{2}\s+\w+)/g)[1],
  ]);

  const j = util.mapToText($, ".jumuatime table td:nth-child(2)");
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/east-plano-islamic-center",
  ids,
  run,
};
