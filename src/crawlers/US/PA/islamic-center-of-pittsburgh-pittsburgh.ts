import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "517cec12-c6c4-4f13-a56d-ce379687930c",
    name: "Islamic Center of Pittsburgh",
    url: "https://www.icp-pgh.org/",
    timeZoneId: "America/New_York",
    address: "4100 Bigelow Blvd, Pittsburgh, PA 15213, USA",
    placeId: "ChIJFZREtS_yNIgR5nv22mFYtNU",
    geo: {
      latitude: 40.4487804,
      longitude: -79.955861,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/islamic-center-of-pittsburgh-pittsburgh",
  ids,
  run: createMasjidalRun(ids, "QKMnW1LB"),
};
