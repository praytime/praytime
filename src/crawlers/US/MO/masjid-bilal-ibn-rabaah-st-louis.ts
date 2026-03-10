import { createMadinaAppsRun } from "../../../madinaapps";
import type { CrawlerModule } from "../../../types";

const MADINAAPPS_CLIENT_ID = "205";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "745cea37-a6ef-47b0-b583-28f4ff5ca5e7",
    name: "Masjid Bilal Ibn Rabaah",
    url: "https://www.islamstl.org/masjidbilal/",
    timeZoneId: "America/Chicago",
    address: "3843 W Pine Mall Blvd, St. Louis, MO 63108, USA",
    placeId: "ChIJ00aAJbm02IcRYsWM5THX7yw",
    geo: {
      latitude: 38.6377917,
      longitude: -90.2403722,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MO/masjid-bilal-ibn-rabaah-st-louis",
  ids,
  run: createMadinaAppsRun(ids, MADINAAPPS_CLIENT_ID),
};
