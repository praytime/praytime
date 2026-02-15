import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a97bd954-7ddc-4244-91fd-15e0d1898f48",
    name: "Masjid Al-Huda",
    url: "http://www.masjidal-huda.org/",
    timeZoneId: "America/Los_Angeles",
    address: "3880 Smith St, Union City, CA 94587, USA",
    placeId: "ChIJIxHdetmVj4ARLg0REb22r_A",
    geo: {
      latitude: 37.5961509,
      longitude: -122.0786946,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".jamah");

  if (util.isJumaToday(ids[0])) {
    const j = util.mapToText($, '.prayerName:contains("Jumuah") + td');
    a.splice(1, 0, j[0] ?? "");
    util.setIqamaTimes(ids[0], a);
    util.setJumaTimes(ids[0], j);
  } else {
    util.setTimes(ids[0], a);
  }

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-huda-union-city",
  ids,
  run,
};
