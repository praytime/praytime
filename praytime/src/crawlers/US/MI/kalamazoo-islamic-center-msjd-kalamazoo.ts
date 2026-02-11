// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "3373034f-3744-40b0-951a-b4ceb0af7254",
    name: "Kalamazoo Islamic Center مسجد 🕌",
    url: "https://kalamazooislamiccenter.com/",
    timeZoneId: "America/Detroit",
    address: "1520 W Michigan Ave, Kalamazoo, MI 49006, USA",
    placeId: "ChIJL4DNxd53F4gRb8kzIKft_Rs",
    geo: {
      latitude: 42.2861767,
      longitude: -85.6058959,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/kalamazoo-islamic-center-msjd-kalamazoo",
  ids,
};
