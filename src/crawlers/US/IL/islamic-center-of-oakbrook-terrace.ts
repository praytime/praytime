import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4dcdad13-521f-448e-8fe9-42a532af76fd",
    name: "ICNA Center Masjid",
    url: "https://www.icnachicago.org/",
    address: "1S270 Summit Ave, Oakbrook Terrace, IL 60181, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJ3UwZKHpNDogRUj6fNs7zmrg",
    geo: {
      latitude: 41.855525,
      longitude: -87.973164,
    },
  },
];
// ChIJ3UwZKHpNDogRUj6fNs7zmrg
export const crawler: CrawlerModule = {
  name: "US/IL/islamic-center-of-oakbrook-terrace",
  ids,
  run: createMasjidalRun(ids, "rGAEZkdn", { jumaCount: 2 }),
};
