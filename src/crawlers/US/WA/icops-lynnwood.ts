import { createMuslimFeedRun } from "../../../muslimfeed";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "55196a3b-8772-4046-a9df-57b47c3ca3a0",
    name: "Islamic Center of Puget Sound",
    url: "http://icpugetsound.org/",
    timeZoneId: "America/Los_Angeles",
    address: "Suite B1, 13319 Mukilteo Speedway, Lynnwood, WA 98087, USA",
    geo: {
      latitude: 47.874552,
      longitude: -122.274526,
    },
    placeId: "ChIJxZgT7RUEkFQRTv6E2cWAtL8",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/icops-lynnwood",
  ids,
  run: createMuslimFeedRun(ids, "2105"),
};
