import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8f8e0e7c-31d9-485a-ad3d-fc5f341f31de",
    name: "Islamic Foundation North",
    url: "http://www.ifnonline.com/",
    address: "1751 O'Plaine Rd, Libertyville, IL 60048, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJFy2RzbeTD4gREXbuIspB0qU",
    geo: {
      latitude: 42.32792,
      longitude: -87.913179,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/ifn-libertyville",
  ids,
  run: createMasjidalRun(ids, "6adJxLkx", { jumaCount: 2 }),
};
