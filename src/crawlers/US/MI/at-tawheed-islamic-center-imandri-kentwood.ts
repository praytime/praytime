import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1dc7b228-edd9-434f-8ff2-0af0a1e771a7",
    name: "At-Tawheed Islamic Center - IM\u0026RI",
    url: "https://grmasjid.org/wp/",
    timeZoneId: "America/Detroit",
    address: "3357 E Paris Ave SE, Kentwood, MI 49512, USA",
    placeId: "ChIJBfO1_wRNGIgRdC7LEEfzk44",
    geo: {
      latitude: 42.9026323,
      longitude: -85.568969,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/at-tawheed-islamic-center-imandri-kentwood",
  ids,
  run: createMasjidalRun(ids, "1QL0ZEdZ", { jumaCount: 2 }),
};
