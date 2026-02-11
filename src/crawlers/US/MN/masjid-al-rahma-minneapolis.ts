// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "16098e7e-b111-47d9-8b9e-d03fb828becd",
    name: "Masjid Al Rahma",
    url: "http://www.mercymn.org/",
    timeZoneId: "America/Chicago",
    address: "2647 Bloomington Ave, Minneapolis, MN 55407, USA",
    placeId: "ChIJz_vvNVMts1IR5r7kNneaj00",
    geo: {
      latitude: 44.95413769999999,
      longitude: -93.25221739999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  $('.namaz:contains("Sunrise")').remove();

  const a = util.mapToText($, ".namaz span");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-al-rahma-minneapolis",
  ids,
  run,
};
