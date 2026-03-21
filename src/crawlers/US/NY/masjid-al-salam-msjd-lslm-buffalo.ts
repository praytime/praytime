import { createMosquePrayerTimesRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b7d3e7bb-9e04-4f2e-adb4-c689ecf91023",
    name: "Masjid Al Salam مسجد السلام",
    url: "http://www.mosqueprayertimes.com/masjidalsalam",
    timeZoneId: "America/New_York",
    address: "1190 E Delavan Ave, Buffalo, NY 14215, USA",
    placeId: "ChIJZ04B7r4N04kRypsqR4_tqPw",
    geo: {
      latitude: 42.922899,
      longitude: -78.81308899999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-salam-msjd-lslm-buffalo",
  ids,
  run: createMosquePrayerTimesRun(ids),
  puppeteer: true,
};
