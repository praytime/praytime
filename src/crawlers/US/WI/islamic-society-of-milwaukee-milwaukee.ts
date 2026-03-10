import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "nzKzJoKO";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "90346b00-804c-410c-8d81-945a6cf544c8",
    name: "Islamic Society of Milwaukee",
    url: "https://www.ismonline.org/ism-main-center",
    timeZoneId: "America/Chicago",
    address: "4707 South 13th Street, Milwaukee, WI 53221, USA",
    placeId: "ChIJTeFDRdQWBYgRwISakD6RR40",
    geo: {
      latitude: 42.9588699,
      longitude: -87.92991640000001,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WI/islamic-society-of-milwaukee-milwaukee",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID),
};
