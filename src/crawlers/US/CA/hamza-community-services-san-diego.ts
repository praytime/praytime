import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "adJq9xAk";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0befcf83-59cd-4a58-8ca3-f222f8c8ad7c",
    name: "Hamza Community Services",
    url: "https://www.masjidhamzasandiego.com/",
    timeZoneId: "America/Los_Angeles",
    address: "9400 Activity Rd Suite I, San Diego, CA 92126, USA",
    placeId: "ChIJQadnz0r524ARYqAgCo9ICvM",
    geo: {
      latitude: 32.8974591,
      longitude: -117.1249449,
    },
  },
];
const run = async () => {
  const iqama = await util.loadMasjidalIqama(MASJIDAL_ID);
  const jumaTimes = [iqama.jummah1, iqama.jummah2, iqama.jummah3]
    .map(util.extractTimeAmPm)
    .filter((time) => time.length > 0);

  util.setIqamaTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
  ]);

  if (jumaTimes.length === 0) {
    throw new Error("failed to parse juma times");
  }
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/hamza-community-services-san-diego",
  ids,
  run,
};
