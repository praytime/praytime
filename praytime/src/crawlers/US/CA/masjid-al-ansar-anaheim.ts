// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "bd77a8ac-c21c-45ec-8f85-f193301506a3",
    name: "Masjid Al-Ansar",
    url: "http://www.wcismasjid.com/",
    timeZoneId: "America/Los_Angeles",
    address: "1717 S Brookhurst St, Anaheim, CA 92804, USA",
    placeId: "ChIJlaR_8U0o3YARDNJAyw9jK9E",
    geo: {
      latitude: 33.8056321,
      longitude: -117.9593634,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-ansar-anaheim",
  ids,
};
