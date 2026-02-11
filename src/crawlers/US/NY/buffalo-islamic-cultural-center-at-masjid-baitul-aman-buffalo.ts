// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "e48dc9df-59b6-4fd1-9a03-d8b153beec7e",
    name: "Buffalo Islamic Cultural Center At Masjid Baitul Aman",
    url: "https://www.facebook.com/Buffaloicc/",
    timeZoneId: "America/New_York",
    address: "637 Walden Ave, Buffalo, NY 14211, USA",
    placeId: "ChIJh-YIpA0N04kRFVxMOWaOlJA",
    geo: {
      latitude: 42.9048159,
      longitude: -78.812372,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/buffalo-islamic-cultural-center-at-masjid-baitul-aman-buffalo",
  ids,
};
