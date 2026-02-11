// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ca1bf016-8910-44e6-8e9a-96fbc1f50b45",
    name: "Masjid Al-Imam Al-Albani",
    url: "https://www.facebook.com/pages/category/Mosque/Masjid-Al-Imam-Al-Albani-New-York-%D9%85%D8%B3%D8%AC%D8%AF-%D8%A7%D9%84%D8%A5%D9%85%D8%A7%D9%85-%D8%A7%D9%84%D8%A3%D9%84%D8%A8%D8%A7%D9%86%D9%8A-158154650934627/",
    timeZoneId: "America/New_York",
    address: "463 3rd Ave, Brooklyn, NY 11215, USA",
    placeId: "ChIJif3tyPtawokR_maQkAt7Us0",
    geo: {
      latitude: 40.6711111,
      longitude: -73.9911111,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-imam-al-albani-brooklyn",
  ids,
};
