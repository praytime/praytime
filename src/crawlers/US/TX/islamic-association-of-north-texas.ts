import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e4e3fa99-3df8-4e8c-8e37-5d353c2b51eb",
    name: "Islamic Assocation of North Texas",
    url: "https://iant.com/",
    timeZoneId: "America/Chicago",
    address: "840 Abrams Rd, Richardson, TX 75081, USA",
    geo: {
      latitude: 32.939541,
      longitude: -96.730714,
    },
    placeId: "ChIJJ7Bj_J4fTIYRfWVohOA_w60",
  },
];
export const crawler: CrawlerModule = {
  name: "US/TX/islamic-association-of-north-texas",
  ids,
  run: createMasjidalRun(ids, "xdy03lAX", { jumaMode: "setJumaTimes" }),
};
