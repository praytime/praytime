import { createMasjidBoxRun } from "../../../masjidbox";
import type { CrawlerModule } from "../../../types";

const PRAYER_TIMES_URL =
  "https://masjidbox.com/prayer-times/arrahman-1630975759761";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0913ff56-2bbf-4254-a56a-b1a2535c727a",
    name: "Masjid Arrahman",
    url: "https://rahimaazizfoundation.org/",
    timeZoneId: "America/New_York",
    address: "171 Knox Ave, West Seneca, NY 14224, USA",
    placeId: "ChIJYcJXa-wN04kRi4zA2l5YdTc", // 'ChIJwxb-y94N04kRwndyJTZLRMg',
    geo: {
      latitude: 42.85908209999999,
      longitude: -78.7820203,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-arrahman-west-seneca",
  ids,
  run: createMasjidBoxRun(ids, PRAYER_TIMES_URL),
};
