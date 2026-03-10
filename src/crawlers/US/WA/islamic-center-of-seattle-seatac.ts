import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c6be683c-1a36-4739-9b47-2b63eedfb1c1",
    name: "Islamic Center of Seattle",
    url: "http://www.assalammasjid.com/",
    timeZoneId: "America/Los_Angeles",
    address: "3040 S 150th St, SeaTac, WA 98188, USA",
    placeId: "ChIJmfZK6D5DkFQRvaZwGLqJORo",
    geo: {
      latitude: 47.4691013,
      longitude: -122.2928708,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-seattle-seatac",
  ids,
  run: createMasjidalRun(ids, "E5AvJ0AX", { jumaCount: 2 }),
};
