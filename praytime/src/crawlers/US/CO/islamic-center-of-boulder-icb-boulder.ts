// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "c575d4fe-5fae-40b8-9a10-4e47e2211f71",
    name: "Islamic Center of Boulder (ICB)",
    url: "http://www.bouldermuslims.com/",
    timeZoneId: "America/Denver",
    address: "5495 Baseline Rd, Boulder, CO 80303, USA",
    placeId: "ChIJEzcg2I7ta4cRtqgPjyHN69Q",
    geo: {
      latitude: 40.00056289999999,
      longitude: -105.2260302,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CO/islamic-center-of-boulder-icb-boulder",
  ids,
};
