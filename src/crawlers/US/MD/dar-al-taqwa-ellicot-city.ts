// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "1427f2cf-32da-4fca-927c-6968f305181e",
    name: "Dar Al-Taqwa",
    url: "http://www.taqwa.net/",
    address: "10740 MD-108, Ellicott City, MD 21042, USA",
    placeId: "ChIJAaZU4WLft4kRrFN2eSzKLwo",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 39.2367,
      longitude: -76.884527,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://us.mohid.co/md/columbia1/dat/masjid/widget/api/index/?m=prayertimings",
  );

  const a = util.mapToText($, ".prayer_iqama_div").filter(util.matchTime);

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/dar-al-taqwa-ellicot-city",
  ids,
  run,
};
