import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ab96494b-6d62-4629-abb1-98731ff87f77",
    name: "Sacred Learning",
    url: "https://www.sacredlearning.org/",
    address: "3900 W Devon Ave, Lincolnwood, IL 60712, USA",
    placeId: "ChIJuV7YxkLOD4gR_GRpXOWNxH4",
    timeZoneId: "America/Chicago",
    geo: {
      latitude: 41.997994,
      longitude: -87.726087,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/IL/sacred-learning-center",
  ids,
  run: createMasjidalRun(ids, "nzKz84AO", { jumaCount: 2 }),
};
