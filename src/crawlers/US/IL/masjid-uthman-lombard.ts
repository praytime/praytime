import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "0dYBvoK6";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7b11db40-224a-4762-90ce-1622e8fa7526",
    name: "Masjid Uthman",
    url: "https://www.masjiduthman.org",
    address: "1208 S. Lawler Ave, Lombard, IL 60148, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJPypuKmhSDogRB1siIxiVoOQ",
    geo: {
      latitude: 41.8855953,
      longitude: -88.0573481,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-uthman-lombard",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID, { jumaMode: "setJumaTimes" }),
};
