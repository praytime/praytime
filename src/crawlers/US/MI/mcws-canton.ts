import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "RKxwV5dO";
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6967897e-bb45-46a7-bae0-9221659e6b0f",
    name: "MCWS",
    url: "http://www.mcws.org/",
    timeZoneId: "America/Detroit",
    address: "40440 Palmer Rd, Canton, MI 48188, USA",
    placeId: "ChIJwWh_XhdSO4gRvqp8RSRYyTo",
    geo: {
      latitude: 42.29512709999999,
      longitude: -83.4389788,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/mcws-canton",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID, { jumaMode: "setJumaTimes" }),
};
