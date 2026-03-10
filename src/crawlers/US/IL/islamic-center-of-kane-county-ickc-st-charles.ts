import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "791243b8-00a4-468f-b2f2-1b9fa554227b",
    name: "Islamic Center of Kane County (ICKC)",
    url: "https://www.ickc.info/",
    timeZoneId: "America/Chicago",
    address: "2325 Dean St #100b, St. Charles, IL 60175, USA",
    placeId: "ChIJ224SoUIdD4gRPizBFEBbmsg",
    geo: {
      latitude: 41.9192446,
      longitude: -88.34301239999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-kane-county-ickc-st-charles",
  ids,
  run: createMasjidalRun(ids, "x4KB2K5Q", { jumaCount: 1 }),
};
