import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "VdwqX8Le";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "27642a3b-af3c-4cb8-87ee-6066d053b2ab",
    name: "AMCC",
    url: "http://www.amccenters.org/",
    timeZoneId: "America/New_York",
    address: "811 Wilma St, Longwood, FL 32750, USA",
    placeId: "ChIJQfGHkw1y54gRct3TzvNbPso",
    geo: {
      latitude: 28.69534800000001,
      longitude: -81.34961179999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/FL/amcc-longwood",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID, { jumaCount: 2 }),
};
