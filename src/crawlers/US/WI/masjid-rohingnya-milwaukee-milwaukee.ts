import { createSelectorRun } from "../../../selectors";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "306651ec-a531-40c9-8192-b25b1fdfb1b1",
    name: "Masjid Rohingnya Milwaukee",
    url: "http://www.masjidmubarak.org/",
    timeZoneId: "America/Chicago",
    address: "1575 W Oklahoma Ave, Milwaukee, WI 53215, USA",
    placeId: "ChIJbZr9Og8RBYgRNSPUgXylxd0",
    geo: {
      latitude: 42.9881529,
      longitude: -87.9334941,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WI/masjid-rohingnya-milwaukee-milwaukee",
  ids,
  run: createSelectorRun(ids, {
    iqama: {
      removeIndexes: [1],
      selector: ".prayerbloc td:last-child",
    },
    jumaDefault: ["check website"],
  }),
};
