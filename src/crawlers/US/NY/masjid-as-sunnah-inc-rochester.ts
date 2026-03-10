import { createFivePrayersRun } from "../../../fiveprayers";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a4a40bbd-131b-4e78-82a6-35f79fdaec01",
    name: "Masjid As-Sunnah Inc",
    url: "http://www.msrny.org/",
    timeZoneId: "America/New_York",
    address: "494 N Goodman St, Rochester, NY 14609, USA",
    placeId: "ChIJQamIlZe11okRE2jbbSNfsVM",
    geo: {
      latitude: 43.1628283,
      longitude: -77.58296539999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-as-sunnah-inc-rochester",
  ids,
  run: createFivePrayersRun(ids, "MasjidSunnah"),
};
