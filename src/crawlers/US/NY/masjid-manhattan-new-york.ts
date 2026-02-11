// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "a4a93cfe-6906-48da-b077-1ddd5c7f1927",
    name: "Masjid Manhattan",
    url: "http://www.masjidmanhattan.com/",
    timeZoneId: "America/New_York",
    address: "30 Cliff St, New York, NY 10038, USA",
    placeId: "ChIJe6WeSx9awokRgGlWNWkUz18",
    geo: {
      latitude: 40.7081606,
      longitude: -74.00506709999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util
    .mapToText($, "li > i:last-child")
    .filter((t) => t.match(/\d+\s*:\s*\d+/))
    .map((t) => t.match(/\d+\s*:\s*\d+\s*\w+/)[0]);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-manhattan-new-york",
  ids,
  run,
};
