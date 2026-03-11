import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "55ed2831-a256-4ef1-80e3-231b8d85fa41",
    name: "Jamaica Muslim Center",
    url: "https://jamaicamuslimcenter.org/",
    timeZoneId: "America/New_York",
    address: "85-37 JMC Way, Jamaica, NY 11432, USA",
    placeId: "ChIJjxcp7-FgwokR0Anky0BRMJg",
    geo: {
      latitude: 40.712634,
      longitude: -73.795754,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/jamaica-muslim-center",
  ids,
  run: createMasjidalRun(ids, "z0AW66Lj", { jumaCount: 2 }),
};
