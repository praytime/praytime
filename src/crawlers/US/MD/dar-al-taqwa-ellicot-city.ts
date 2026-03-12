import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1427f2cf-32da-4fca-927c-6968f305181e",
    name: "Dar Al-Taqwa",
    url: "http://www.taqwa.net/",
    address: "10740 MD-108, Ellicott City, MD 21042, USA",
    placeId: "ChIJAaZU4WLft4kRrFN2eSzKLwo",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 39.2367,
      longitude: -76.884527,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MD/dar-al-taqwa-ellicot-city",
  ids,
  run: createMasjidalRun(ids, "QL0BzpdZ", { jumaCount: 2 }),
};
