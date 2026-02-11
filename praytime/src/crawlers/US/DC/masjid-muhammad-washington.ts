// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "e0826602-37a7-4db4-b92d-3463db723dc7",
    name: "Masjid Muhammad",
    url: "http://www.masjidmuhammad.com/",
    timeZoneId: "America/New_York",
    address: "1519 4th St NW, Washington, DC 20001, USA",
    placeId: "ChIJe18atfa3t4kRwgPVqAqIgic",
    geo: {
      latitude: 38.91032149999999,
      longitude: -77.01591169999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/DC/masjid-muhammad-washington",
  ids,
};
