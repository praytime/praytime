import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2b591b0a-6808-459b-8998-7e74f0251898",
    name: "Masjid Al Huda",
    url: "http://masjidalhuda.org/",
    address: "1081 Irving Park Rd, Schaumburg, IL 60193, USA",
    placeId: "ChIJfXzPEG6pD4gRv_p7cMLrda8",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.997743,
      longitude: -88.118683,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/masjid-al-huda-schaumburg",
  ids,
  run: createMasjidalRun(ids, "1QL0GKZD", { jumaCount: 2 }),
};
