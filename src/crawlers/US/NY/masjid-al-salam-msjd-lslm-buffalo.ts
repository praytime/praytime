import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url, { waitUntil: "networkidle0" });

    const times = await util.pptMapToText(
      page,
      ".timetable-verticle .brrt .tdy",
    );
    times.splice(1, 1); // remove shuruq
    util.setTimes(ids[0], times);
  }),
  puppeteer: true,
};
