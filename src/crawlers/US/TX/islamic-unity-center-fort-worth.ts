// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "3fb69da2-e9b8-495e-b09d-25e71abf1598",
    name: "Islamic Unity Center",
    url: "http://www.islamicunitycenter.org/",
    timeZoneId: "America/Chicago",
    address: "1207 Country Club Ln, Fort Worth, TX 76112, USA",
    placeId: "ChIJNVxQVDd6ToYRVK5NpDW2_uQ",
    geo: {
      latitude: 32.76305019999999,
      longitude: -97.232677,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-unity-center-fort-worth",
  ids,
};
