// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "99d65b52-7ead-4c09-9593-1eef25a6bf89",
    name: "Georgia Islamic Institute",
    url: "http://www.georgiaislamicinstitute.com/",
    timeZoneId: "America/New_York",
    address: "177 Simonton Rd SW, Lawrenceville, GA 30046, USA",
    placeId: "ChIJ31gIXN--9YgRQChhNkfhMwo",
    geo: {
      latitude: 33.93390389999999,
      longitude: -83.9718875,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/GA/georgia-islamic-institute-lawrenceville",
  ids,
};
