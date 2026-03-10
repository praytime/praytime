import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "19247d38-dce3-4ed1-a3a3-ed2710c8306a",
    name: "Cham Refugees Community",
    url: "https://www.chamrefugeescommunity.org/",
    timeZoneId: "America/Los_Angeles",
    address: "5945 39th Ave S, Seattle, WA 98118, USA",
    placeId: "ChIJa_heFQdqkFQRp3KV8ebB7rw",
    geo: {
      latitude: 47.5484524,
      longitude: -122.2837274,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/cham-refugees-community-seattle",
  ids,
  run: createMasjidalRun(ids, "lJAmRjdR", { jumaCount: 1 }),
};
