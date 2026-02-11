// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "d3966e51-ebda-4ff2-83ce-dba5f9f8cae1",
    name: "Maryam Islamic Center",
    url: "https://www.maryammasjid.org",
    timeZoneId: "America/Chicago",
    address: "504 Sartartia Rd, Sugar Land, TX 77479, USA",
    placeId: "ChIJ33hIXXThQIYRZG1rSp776vU",
    geo: {
      latitude: 29.594437,
      longitude: -95.68400000000001,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, ".wpb_wrapper td:last-child")
    .filter((t) => !t.match(/(salah|iqamah)/i));

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/maryam-islamic-center-sugar-land",
  ids,
  run,
};
