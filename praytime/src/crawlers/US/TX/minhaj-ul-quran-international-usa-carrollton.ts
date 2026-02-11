// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "940dcd5e-714c-4ff1-ad2c-cc9631bfab82",
    name: "Minhaj ul Quran International USA",
    url: "https://www.minhaj.org/english/USA",
    timeZoneId: "America/Chicago",
    address: "3751 N Josey Ln, Carrollton, TX 75007, USA",
    placeId: "ChIJS_bR3a8lTIYRO7mPrvnIw0M",
    geo: {
      latitude: 33.0133564,
      longitude: -96.8875091,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/minhaj-ul-quran-international-usa-carrollton",
  ids,
};
