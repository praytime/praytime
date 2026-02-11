// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ba4d235c-df95-42ed-a10b-e220acb36c04",
    name: "Buffalo Muslim Community Center",
    url: "https://buffalomuslimcommunitycenter.business.site/?utm_source\u003Dgmb\u0026utm_medium\u003Dreferral",
    timeZoneId: "America/New_York",
    address: "497 Minnesota Ave, Buffalo, NY 14215, USA",
    placeId: "ChIJWTkuCB5z04kROH-r4hzqYng",
    geo: {
      latitude: 42.9456269,
      longitude: -78.81103139999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/buffalo-muslim-community-center-buffalo",
  ids,
};
