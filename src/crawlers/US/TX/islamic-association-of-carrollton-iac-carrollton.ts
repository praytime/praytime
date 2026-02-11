// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "6bf511f1-0c18-4ceb-82ce-2c7c0e870c96",
    name: "Islamic Association of Carrollton (IAC)",
    url: "http://www.masjidal-rahman.org/",
    timeZoneId: "America/Chicago",
    address: "1901 Kelly Blvd, Carrollton, TX 75006, USA",
    placeId: "ChIJJewiC4omTIYRVeJ0orRW5_k",
    geo: {
      latitude: 32.9615115,
      longitude: -96.8778054,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, ".table td:last-child")
    .filter(util.matchTimeAmPm);

  // dedup results using spread operator and Set
  // https://stackoverflow.com/a/9229821/8370398
  const j = [
    ...new Set(
      util
        .mapToText($, '.table tr:contains("Khutbah")')
        .map(util.extractTimeAmPm),
    ),
  ];

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-carrollton-iac-carrollton",
  ids,
  run,
};
