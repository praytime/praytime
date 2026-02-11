// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "392163c6-efb8-4e55-9b86-a7e33781a053",
    name: "Madinah Masjid",
    url: "https://lovejoymadinahmasjid.org/",
    timeZoneId: "America/New_York",
    address: "1040 E Lovejoy St, Buffalo, NY 14206, USA",
    placeId: "ChIJE-D9EmAN04kR2DACVU-0k0U",
    geo: {
      latitude: 42.8904082,
      longitude: -78.809929,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/madinah-masjid-buffalo",
  ids,
};
