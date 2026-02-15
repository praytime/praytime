import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "98f01538-d4f3-4325-b064-cfd2e2e9bdaa",
    name: "Dar Alhuda Inc مسجد",
    url: "http://www.masjiddaralhuda.com/",
    timeZoneId: "America/Chicago",
    address: "1245 Karla Dr, Hurst, TX 76053, USA",
    placeId: "ChIJC1hNWyt_ToYRAZM_rWwLe6w",
    geo: {
      latitude: 32.8331572,
      longitude: -97.17820780000001,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  $('.dptTimetable tr:contains("Sunrise")').remove();

  const j = util.mapToText($, 'p:contains("Jumaa") span').slice(0, 1);
  util.setJumaTimes(ids[0], j);

  if (util.isJumaToday(ids[0])) {
    const a = util.mapToText($, ".dptTimetable td:last-child");
    util.setIqamaTimes(ids[0], a);
  } else {
    const a = util.mapToText($, ".jamah");
    util.setIqamaTimes(ids[0], a);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/dar-alhuda-inc-msjd-hurst",
  ids,
  run,
};
