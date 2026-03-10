import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a3f6b73c-6e49-4651-a95f-5af2d6ac8c09",
    name: "Masjid Ul Islam",
    url: "http://www.iieonline.org/",
    address: "1280 Bluff City Blvd, Elgin, IL 60120, USA",
    placeId: "ChIJvTOnbYQGD4gRP4Y3OQWN74I",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 42.018804,
      longitude: -88.240546,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/masjid-ul-islam-elgin",
  ids,
  run: createMasjidalRun(ids, "OMA58LrE", {
    jumaCount: 2,
    jumaMode: "setJumaTimes",
  }),
};
