// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "874ba8ce-98bd-4d35-b351-07ff40717453",
    name: "Masjid Al Jameel",
    url: "https://www.masjidaljameel.com/",
    address: "625 N. Swift Rd. Addison, IL 60101",
    timeZoneId: "America/Chicago",
    placeId: "ChIJweqmBQatD4gRMnvZMHZxjMA",
    geo: {
      latitude: 41.938175,
      longitude: -88.04171,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-al-jameel-addison-il",
  ids,
};
