import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f2987bfe-fdce-4623-aa86-a18e675e723a",
    name: "Muslim Community Center of Apopka",
    url: "https://masjid.mccapopka.org/",
    timeZoneId: "America/New_York",
    address: "458 Oakland Ave, Apopka, FL 32703, USA",
    placeId: "ChIJGZQBXhB254gRSStaHIU24Qc",
    geo: {
      latitude: 28.6716829,
      longitude: -81.5033984,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/FL/tsentralna-dzhamiia-na-apopka-apopka",
  ids,
  run: createMasjidalRun(ids, "PAP9wZdJ", { jumaCount: 1 }),
};
