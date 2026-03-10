import { createDptTimetableRun } from "../../../dpt";
import type { CrawlerModule } from "../../../types";

const PRAYER_PAGE_URL = "https://suffaheducational.org/";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "25ee35dc-430d-4b43-8b99-191b3a5f88b8",
    name: "Jamia Suffah",
    url: "https://jamiasuffah.org/",
    timeZoneId: "America/Chicago",
    address: "3929 Oakton St, Skokie, IL 60076, USA",
    placeId: "ChIJn9eKCMXPD4gR1SxGn3VEY4I",
    geo: {
      latitude: 42.0260405,
      longitude: -87.72690059999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/jamia-suffah-skokie",
  ids,
  run: createDptTimetableRun(ids, PRAYER_PAGE_URL, {
    errorContext: "Suffah Educational timetable",
  }),
};
