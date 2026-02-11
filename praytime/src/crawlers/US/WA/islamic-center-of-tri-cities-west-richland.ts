// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "92b2a9ec-b52b-4245-9a0c-df7b0f7e756c",
    name: "Islamic Center of Tri Cities",
    url: "http://www.islamiccenteroftricities.com/",
    timeZoneId: "America/Los_Angeles",
    address: "2900 Bombing Range Rd, West Richland, WA 99353, USA",
    placeId: "ChIJ44dxVB5wmFQRNhIM6c2oYXo",
    geo: {
      latitude: 46.27485079999999,
      longitude: -119.3456611,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-tri-cities-west-richland",
  ids,
};
