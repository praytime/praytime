import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8255b917-adb0-4d5a-9aeb-685783173fde",
    name: "Masjid Isa Ibn Maryam",
    url: "http://masjidisa.com/",
    timeZoneId: "America/New_York",
    address: "501 Park St, Syracuse, NY 13203, USA",
    placeId: "ChIJAxeGqVPy2YkRIdJkAvSDE4M",
    geo: {
      latitude: 43.062653,
      longitude: -76.1403164,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  $('tr:contains("Sunrise")').remove();

  const a = util.mapToText($, ".dptTimetable td:last-child");

  if (util.isJumaToday(ids[0])) {
    util.setJumaTimes(ids[0], [a[1]]);
  } else {
    util.setJumaTimes(ids[0], ["check website"]);
  }

  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-isa-ibn-maryam-syracuse",
  ids,
  run,
};
