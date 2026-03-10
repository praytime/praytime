import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

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
export const crawler: CrawlerModule = {
  name: "US/FL/albir-islamic-association-inc-kissimmee",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID, {
    jumaMode: "setJumaTimes",
    normalizeJumaTimes: true,
    requireJuma: true,
  }),
};
