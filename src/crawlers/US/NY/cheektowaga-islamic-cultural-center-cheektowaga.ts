import { createPuppeteerRun } from "../../../ppt";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const crawlerPuppeteer = true;
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "bf90f8e9-2bad-4a01-a398-7fe0a04dc0a7",
    name: "Cheektowaga Islamic Cultural Center",
    url: "http://mosqueprayertimes.com/ciccmasjid",
    timeZoneId: "America/New_York",
    address: "3459 Harlem Rd, Cheektowaga, NY 14225, USA",
    placeId: "ChIJb_Ndo9Jz04kRydZJdnq4sLg",
    geo: {
      latitude: 42.9378555,
      longitude: -78.78368019999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/cheektowaga-islamic-cultural-center-cheektowaga",
  ids,
  run: createPuppeteerRun(ids, async (page) => {
    await page.goto(ids[0].url ?? "", { waitUntil: "networkidle0" });

    const times = await util.pptMapToText(
      page,
      ".timetable-verticle .brrt .tdy",
    );
    times.splice(1, 1);
    util.setTimes(ids[0], times);
  }),
  puppeteer: crawlerPuppeteer,
};
