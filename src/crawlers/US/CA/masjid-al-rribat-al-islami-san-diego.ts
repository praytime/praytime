import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "VKpDmoKP";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "84725962-35c5-485f-bea3-37db288dd9a4",
    name: "Masjid Al-Rribat Al-Islami",
    url: "http://www.masjidribat.com/",
    timeZoneId: "America/Los_Angeles",
    address: "7173 Saranac St, San Diego, CA 92115, USA",
    placeId: "ChIJoRtyneVW2YARBrgiFD_SoY0",
    geo: {
      latitude: 32.7707151,
      longitude: -117.0432437,
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
  name: "US/CA/masjid-al-rribat-al-islami-san-diego",
  ids,
  run,
};
