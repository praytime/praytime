import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

// const axios = require('axios')
// const cheerio = require('cheerio')

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6515de3b-bbda-49aa-97bd-6962072a9880",
    name: "Dar Al-Hijrah",
    url: "https://hijrah.org/",
    address: "3159 Row St, Falls Church, VA 22044, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJKZHrdH60t4kRDYVdiyL8Gps",
    geo: {
      latitude: 38.861948,
      longitude: -77.14697,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  util.setIqamaTimes(ids[0], util.mapToText($, "table.dptTimetable td.jamah"));
  util.setJumaTimes(ids[0], [
    "check website",
    "check website",
    "check website",
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/dar-al-hijrah-va",
  ids,
  run,
};
