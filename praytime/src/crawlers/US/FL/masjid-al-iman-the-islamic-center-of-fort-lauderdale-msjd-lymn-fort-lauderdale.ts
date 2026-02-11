// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "7858cf4b-d2fd-4769-a993-0ede9a8c7c30",
    name: "Masjid Al Iman (The Islamic Center of Fort Lauderdale) مسجد الايمان",
    url: "http://www.masjidaliman.com/",
    timeZoneId: "America/New_York",
    address: "2542 Franklin Dr, Fort Lauderdale, FL 33311, USA",
    placeId: "ChIJha0mmSgB2YgRwWyXbqHi3DA",
    geo: {
      latitude: 26.1347337,
      longitude: -80.17685,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-iman-the-islamic-center-of-fort-lauderdale-msjd-lymn-fort-lauderdale",
  ids,
};
