// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "16d3e6a1-2928-4f27-9eeb-9cf42ef78159",
    name: "ISGH Bear Creek Islamic Center (BCIC) | Masjid Al-Mustafa",
    url: "https://www.facebook.com/bearcreekic/",
    timeZoneId: "America/Chicago",
    address: "17250 Coventry Park Dr, Houston, TX 77084, USA",
    placeId: "ChIJMawecWbXQIYRDnMCkzIPN_E",
    geo: {
      latitude: 29.8620956,
      longitude: -95.6716637,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/isgh-bear-creek-islamic-center-bcic-masjid-al-mustafa-houston",
  ids,
};
