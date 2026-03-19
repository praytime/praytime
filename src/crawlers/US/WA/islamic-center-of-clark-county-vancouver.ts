import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5f235139-90e2-4f02-a5d6-61f2f481578a",
    name: "Islamic Center of Clark County",
    url: "http://www.icccwa.org/",
    timeZoneId: "America/Los_Angeles",
    address: "519 SE 116th Ave Suite 3, Vancouver, WA 98683, USA",
    placeId: "ChIJPWpXenWllVQRpLjIj7Fc3Ds",
    geo: {
      latitude: 45.617581,
      longitude: -122.553118,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-clark-county-vancouver",
  ids,
  run: createMasjidalRun(ids, "JdGJGRAP", { jumaMode: "setJumaTimes" }),
};
