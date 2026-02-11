// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "20e9a498-b5a3-440d-a8be-1f2e9c673ff9",
    name: "Clear Lake Islamic Center - Masjid",
    url: "http://www.themasjid.org/",
    timeZoneId: "America/Chicago",
    address: "17511 El Camino Real, Houston, TX 77058, USA",
    placeId: "ChIJueQXSVacQIYR2MnuD8WRWjI",
    geo: {
      latitude: 29.5535385,
      longitude: -95.1087723,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".tg td:last-child").filter(Boolean); // filter out falsy values e.g. empty strings

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/clear-lake-islamic-center-masjid-houston",
  ids,
  run,
};
