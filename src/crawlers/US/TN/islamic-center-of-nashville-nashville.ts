import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "017bd43c-cdac-4991-a034-1fce17bda7f7",
    name: "Islamic Center of Nashville",
    url: "http://www.icntn.org/",
    timeZoneId: "America/Chicago",
    address: "2515 12th Ave S, Nashville, TN 37204, USA",
    placeId: "ChIJGT6Xti9kZIgRG21qxtnpFMA",
    geo: {
      latitude: 36.12428,
      longitude: -86.789977,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TN/islamic-center-of-nashville-nashville",
  ids,
  run: createMasjidalRun(ids, "pVdwPMKe", { jumaCount: 2 }),
};
