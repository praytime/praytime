// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "bdd5476f-ad61-496f-ae42-aeed263e2c1d",
    name: "MCECC & Almadinah Masjid",
    url: "https://mcecc.com/",
    timeZoneId: "America/Chicago",
    address: "5281 Casa Bella, San Antonio, TX 78249, USA",
    placeId: "ChIJITmWGsNmXIYR7t31XvkrwPk",
    geo: {
      latitude: 29.5712433,
      longitude: -98.5893402,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".cl-prayer > div:last-child");
  const j = util.mapToText($, ".jumuatime td:nth-child(2)");

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/mcecc-and-almadinah-masjid-san-antonio",
  ids,
  run,
};
