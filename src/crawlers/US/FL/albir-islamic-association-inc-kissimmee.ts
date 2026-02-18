import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MASJIDAL_ID = "xdyqbZdX";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "403af7a7-b7ae-4d9b-b29a-8d2e902ad439",
    name: "Albir Islamic Association Inc",
    url: "http://www.albircenter.org/",
    timeZoneId: "America/New_York",
    address: "4870 Old Tampa Hwy, Kissimmee, FL 34758, USA",
    placeId: "ChIJebXjXPuC3YgRuDiCo-Ecoak",
    geo: {
      latitude: 28.2577859,
      longitude: -81.47803239999999,
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
  name: "US/FL/albir-islamic-association-inc-kissimmee",
  ids,
  run,
};
