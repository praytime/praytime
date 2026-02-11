// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "61490427-ad83-4476-b667-47774497c94b",
    name: "Masjid-ul Mumineen",
    url: "http://www.masjidulmumineen.org/",
    timeZoneId: "America/Chicago",
    address: "8875 Benning Dr, Houston, TX 77031, USA",
    placeId: "ChIJ1b_xXDroQIYRLKD4ibC2TTI",
    geo: {
      latitude: 29.658454,
      longitude: -95.531568,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".top_time_circle li span");

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-ul-mumineen-houston",
  ids,
  run,
};
