// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "b0d736d0-5382-416c-955a-d65283d6755f",
    name: "Bayt Al-Karim Islamic Center",
    url: "https://www.dncfw.org/",
    timeZoneId: "America/Chicago",
    address: "4500 Columbus Trail, Fort Worth, TX 76133, USA",
    placeId: "ChIJuSVdOJ9tToYRjZoh3mCUzaY",
    geo: {
      latitude: 32.6287773,
      longitude: -97.3915478,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  util.setTimes(
    ids[0],
    util
      .mapToText($, "aside#mh_display_prayer_times-2 td:last-child")
      .slice(0, 6),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/bayt-al-karim-islamic-center-fort-worth",
  ids,
  run,
};
