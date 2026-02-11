// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "6ca13c10-c2ef-4c49-aec3-3277c0be1cf7",
    name: "Islamic Association of The Colony",
    url: "http://www.iatcus.org/",
    timeZoneId: "America/Chicago",
    address: "5201 S Colony Blvd #535, The Colony, TX 75056, USA",
    placeId: "ChIJy9DRp9g6TIYRjqNkxI8vCus",
    geo: {
      latitude: 33.0857247,
      longitude: -96.8787624,
    },
  },
];
const run = async () => {
  const $ = await util.load("https://www.iatcus.org/prayer-time.html");

  const a = util.mapToText($, "tr:last-child td");
  const j = a.pop().match(util.timeAmPmRx);

  util.setTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-the-colony-the-colony",
  ids,
  run,
};
