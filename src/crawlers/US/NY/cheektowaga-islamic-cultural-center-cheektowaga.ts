import { createMosquePrayerTimesRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bf90f8e9-2bad-4a01-a398-7fe0a04dc0a7",
    name: "Cheektowaga Islamic Cultural Center",
    url: "http://mosqueprayertimes.com/ciccmasjid",
    timeZoneId: "America/New_York",
    address: "3459 Harlem Rd, Cheektowaga, NY 14225, USA",
    placeId: "ChIJb_Ndo9Jz04kRydZJdnq4sLg",
    geo: {
      latitude: 42.9378555,
      longitude: -78.78368019999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/cheektowaga-islamic-cultural-center-cheektowaga",
  ids,
  run: createMosquePrayerTimesRun(ids),
  puppeteer: crawlerPuppeteer,
};
