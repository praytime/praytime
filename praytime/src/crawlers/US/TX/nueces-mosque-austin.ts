// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "28e5a488-c36b-40c5-8dfb-45343027b70e",
    name: "Nueces Mosque",
    url: "http://nuecesmosque.com/",
    timeZoneId: "America/Chicago",
    address: "1906 Nueces St, Austin, TX 78705, USA",
    placeId: "ChIJ741kX3a1RIYRVpcxO5qJa5A",
    geo: {
      latitude: 30.2831868,
      longitude: -97.7443387,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, 'tr:contains("Iqama") ~ tr td:last-child');
  a.splice(1, 1); // remove sunrise
  util.setIqamaTimes(ids[0], a);

  const j = a[5].match(/\d+:\d+/g);

  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/nueces-mosque-austin",
  ids,
  run,
};
