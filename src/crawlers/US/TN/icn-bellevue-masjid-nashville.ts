import { createMadinaAppsRun } from "../../../madinaapps";
import type { CrawlerModule } from "../../../types";

const MADINAAPPS_CLIENT_ID = "86";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "06218b10-3f44-4217-ac3b-e98eb30461d7",
    name: "ICN Bellevue Masjid",
    url: "http://icnbm.org/",
    timeZoneId: "America/Chicago",
    address: "7337 Charlotte Pike, Nashville, TN 37209, USA",
    placeId: "ChIJrdHzzZeJZIgR54n1bWVzeFE",
    geo: {
      latitude: 36.1172624,
      longitude: -86.91980459999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TN/icn-bellevue-masjid-nashville",
  ids,
  run: createMadinaAppsRun(ids, MADINAAPPS_CLIENT_ID),
};
