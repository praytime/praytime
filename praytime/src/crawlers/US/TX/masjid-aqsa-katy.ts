// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "3f49d3f2-7fd6-497f-94ee-da0589600cab",
    name: "Masjid Aqsa",
    url: "https://www.aqsamasjidkaty.com/",
    timeZoneId: "America/Chicago",
    address: "2810 Saddlehorn Trail, Katy, TX 77494, USA",
    placeId: "ChIJO7QBTLUmQYYRvlcNw8VQUQk",
    geo: {
      latitude: 29.75469709999999,
      longitude: -95.79475130000002,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayer_time_color_new");
  a.splice(3, 0, "-"); // insert maghrib

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-aqsa-katy",
  ids,
  run,
};
