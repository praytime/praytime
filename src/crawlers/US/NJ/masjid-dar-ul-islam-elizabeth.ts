// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "7599f685-e4be-4999-a525-7b7d27edaa63",
    name: "Masjid Dar-Ul Islam",
    url: "https://www.facebook.com/MasjidDarulIslam/",
    timeZoneId: "America/New_York",
    address: "602-616 Salem Ave, Elizabeth, NJ 07208, USA",
    placeId: "ChIJV-HnrK1SwokR0aUBVbEfrSA",
    geo: {
      latitude: 40.67647600000001,
      longitude: -74.21474529999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NJ/masjid-dar-ul-islam-elizabeth",
  ids,
};
