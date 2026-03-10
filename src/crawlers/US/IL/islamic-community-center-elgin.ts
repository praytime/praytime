import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6de66ece-24de-45c7-861c-2b3227367e49",
    name: "Islamic Community Center",
    url: "http://www.iccelgin.com/",
    timeZoneId: "America/Chicago",
    address: "345 Heine Ave, Elgin, IL 60123, USA",
    placeId: "ChIJvXNTvzkFD4gR47PA2osOIPU",
    geo: {
      latitude: 42.0426692,
      longitude: -88.31287669999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/islamic-community-center-elgin",
  ids,
  run: createMasjidalRun(ids, "VGA6rAeq", { jumaCount: 2 }),
};
