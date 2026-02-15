import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fe8ded7a-a8bf-4ee3-9e80-3f85998b5684",
    name: "Islamic Society of Germantown",
    url: "http://www.isgtown.org/",
    timeZoneId: "America/New_York",
    address: "19825 Blunt Rd, Germantown, MD 20876, USA",
    placeId: "ChIJB0mhQIkstokRK6EqRZDG6xk",
    geo: {
      latitude: 39.18115899999999,
      longitude: -77.235929,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = [
    util.mapToText($, 'div[data-content-shortcode*="fajr_name"]'),
    util.mapToText($, 'div[data-content-shortcode*="dhuhr_name"]'),
    util.mapToText($, 'div[data-content-shortcode*="asr_name"]'),
    util.mapToText($, 'div[data-content-shortcode*="maghrib_name"]'),
    util.mapToText($, 'div[data-content-shortcode*="isha_name"]'),
  ].flat();

  const j = util.mapToText($, 'div[data-content-shortcode*="jumuah-time"]');

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/islamic-society-of-germantown-germantown",
  ids,
  run,
};
