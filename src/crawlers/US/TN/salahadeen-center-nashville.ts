import { createMadinaAppsRun } from "../../../madinaapps";
import type { CrawlerModule } from "../../../types";

const MADINAAPPS_CLIENT_ID = "53";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "012ed6d8-6c79-4374-a9ac-aecf51863469",
    name: "Salahadeen Center",
    url: "http://www.scntn.org/",
    timeZoneId: "America/Chicago",
    address: "364 Elysian Fields Ct, Nashville, TN 37211, USA",
    placeId: "ChIJ5WmZn51vZIgR-gHAT0SJiqk",
    geo: {
      latitude: 36.0871618,
      longitude: -86.728723,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TN/salahadeen-center-nashville",
  ids,
  run: createMadinaAppsRun(ids, MADINAAPPS_CLIENT_ID),
};
