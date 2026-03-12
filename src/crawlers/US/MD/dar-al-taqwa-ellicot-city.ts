import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
const run = async () => {
  // The linked Mohid widget currently renders PM prayers as AM values.
  util.setCheckWebsiteTimes(ids[0]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/dar-al-taqwa-ellicot-city",
  ids,
  run,
};
