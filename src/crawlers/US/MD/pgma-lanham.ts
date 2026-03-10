import { createPrayerTableRun } from "../../../prayertable";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a5c8e3f5-25fe-46d6-813c-e86f8002a7a6",
    name: "Prince George's Muslim Association",
    url: "http://pgmamd.org",
    address: "9150 Lanham Severn Rd, Lanham, MD 20706, USA",
    placeId: "ChIJu9mKv73Bt4kRu9BSvbTPfDU",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 38.967486,
      longitude: -76.856091,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MD/pgma-lanham",
  ids,
  run: createPrayerTableRun(ids, {
    errorContext: "pgmamd.org prayer timings table",
    iqamaCellIndex: 2,
    parseJumaTimes: ({ iqamaText }) => util.matchTimeAmPmG(iqamaText) ?? [],
    tableSelector: "table.salah_timings_class",
  }),
};
