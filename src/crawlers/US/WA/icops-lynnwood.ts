import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "55196a3b-8772-4046-a9df-57b47c3ca3a0",
    name: "Islamic Center of Puget Sound",
    url: "http://icpugetsound.org/",
    timeZoneId: "America/Los_Angeles",
    address: "15709 Hwy 99, Lynnwood, WA 98087, USA",
    geo: {
      latitude: 47.85614109999999,
      longitude: -122.2885226,
    },
    placeId: "ChIJxRve_RQFkFQReey2T-_3xBA",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/icops-lynnwood",
  ids,
  // MuslimFeed no longer exposes current iqama times for this masjid.
};
