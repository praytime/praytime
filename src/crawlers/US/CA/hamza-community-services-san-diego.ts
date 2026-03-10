import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "adJq9xAk";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0befcf83-59cd-4a58-8ca3-f222f8c8ad7c",
    name: "Hamza Community Services",
    url: "https://www.masjidhamzasandiego.com/",
    timeZoneId: "America/Los_Angeles",
    address: "9400 Activity Rd Suite I, San Diego, CA 92126, USA",
    placeId: "ChIJQadnz0r524ARYqAgCo9ICvM",
    geo: {
      latitude: 32.8974591,
      longitude: -117.1249449,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/hamza-community-services-san-diego",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID, {
    jumaMode: "setJumaTimes",
    normalizeJumaTimes: true,
    requireJuma: true,
  }),
};
