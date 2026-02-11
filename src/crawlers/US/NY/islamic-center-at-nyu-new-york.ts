// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "19890119-eec4-4342-86e2-82eb9ffc9e77",
    name: "Islamic Center at NYU",
    url: "http://www.icnyu.org/",
    timeZoneId: "America/New_York",
    address: "238 Thompson St #4, New York, NY 10012, USA",
    placeId: "ChIJab_h_ZNZwokRdGaQIvJ_MRI",
    geo: {
      latitude: 40.730166,
      longitude: -73.9980533,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-center-at-nyu-new-york",
  ids,
};
