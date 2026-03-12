import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

// const axios = require('axios')
// const cheerio = require('cheerio')

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0f2d3588-0e34-4b08-be14-aa2afd926927",
    name: "Light of Islam",
    url: "http://lightofislammasjid.org/",
    address: "46 E 147th St, Harvey, IL 60426, USA",
    placeId: "ChIJqZmyVakjDogR5h13FztqPP8",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.622404,
      longitude: -87.653373,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const iqamaTimes = util.mapToText(
    $,
    '.dptTimetable tr:contains("Iqamah") td',
  );

  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse Light of Islam iqama timings");
  }

  util.setIqamaTimes(ids[0], iqamaTimes);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/IL/light-of-islam-harvey",
  ids,
  run,
};
