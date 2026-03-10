import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "76667470-6e6e-4d16-9cb4-80926640d023",
    name: "Attawheed Islamic Center",
    url: "http://www.attawheed.org/",
    timeZoneId: "America/New_York",
    address: "401 Washington Ave, Carnegie, PA 15106, USA",
    placeId: "ChIJBejK-cz3NIgRN6dEpPBaUEA",
    geo: {
      latitude: 40.4093101,
      longitude: -80.0834061,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/PA/attawheed-islamic-center-carnegie",
  ids,
  run: createMasjidalRun(ids, "zKz8QzAO"),
};
