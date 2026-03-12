import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "369b7469-ff19-4661-bc86-dea167190ee3",
    name: "Canton Islamic Center",
    url: "http://www.cicmi.org/",
    timeZoneId: "America/Detroit",
    address: "5840 N Canton Center Rd #218, Canton, MI 48187, USA",
    placeId: "ChIJ02N8d59TO4gR9GzwtbbNHn0",
    geo: {
      latitude: 42.3245195,
      longitude: -83.4865786,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/canton-islamic-center-canton",
  ids,
  run: createMasjidalRun(ids, "8K9qpNKp", { jumaCount: 1 }),
};
