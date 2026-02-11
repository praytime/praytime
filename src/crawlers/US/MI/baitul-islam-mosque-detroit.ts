// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "3d5dfe7a-3048-4bf3-b99b-9856ca00d01a",
    name: "Baitul Islam Mosque",
    url: "http://biid.lsa.umich.edu/communities.html",
    timeZoneId: "America/Detroit",
    address: "7826 Klein St, Detroit, MI 48211, USA",
    placeId: "ChIJmQNMRVLSJIgRg1waJTHQJMg",
    geo: {
      latitude: 42.38707699999999,
      longitude: -83.039514,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/baitul-islam-mosque-detroit",
  ids,
};
