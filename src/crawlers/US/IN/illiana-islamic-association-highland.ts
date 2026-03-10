import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "XAlRlVKb";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ac228046-60ee-49d8-b290-355560944866",
    name: "Illiana Islamic Association",
    url: "http://www.highlandmasjid.org/",
    timeZoneId: "America/Chicago",
    address: "9608 Spring St, Highland, IN 46322, USA",
    placeId: "ChIJK1r4s9DgEYgR4kaFSlvpQ3Q",
    geo: {
      latitude: 41.5387837,
      longitude: -87.4693341,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IN/illiana-islamic-association-highland",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID, { jumaCount: 2 }),
};
