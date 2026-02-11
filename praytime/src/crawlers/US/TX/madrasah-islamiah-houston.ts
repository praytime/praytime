// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "fa0c0b52-0ca1-4b77-ae88-83686d708fe3",
    name: "Madrasah Islamiah",
    url: "https://madrasahislamiah.org/",
    timeZoneId: "America/Chicago",
    address: "6665 Bintliff Dr, Houston, TX 77074, USA",
    placeId: "ChIJlxkDz0XCQIYRr7YC1exqH2c",
    geo: {
      latitude: 29.7070846,
      longitude: -95.50498069999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".table-prayer td:last-child");
  a.splice(0, 1); // remove header

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/madrasah-islamiah-houston",
  ids,
  run,
};
