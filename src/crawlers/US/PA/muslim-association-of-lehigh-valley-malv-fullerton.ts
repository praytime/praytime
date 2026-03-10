import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cabac678-ddec-439d-bfab-1d5a9eebabd2",
    name: "Muslim Association of Lehigh Valley (MALV)",
    url: "https://malv.org/",
    timeZoneId: "America/New_York",
    address: "1988 Schadt Ave, Whitehall, PA 18052, USA",
    placeId: "ChIJtdBRl8k5xIkRRf7aoxRK3RQ",
    geo: {
      latitude: 40.6373832,
      longitude: -75.5068182,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/PA/muslim-association-of-lehigh-valley-malv-fullerton",
  ids,
  run: createMasjidalRun(ids, "ZyLj4YdQ", {
    jumaCount: 2,
    jumaMode: "setJumaTimes",
  }),
};
