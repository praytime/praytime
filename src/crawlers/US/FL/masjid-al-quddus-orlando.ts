import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c5b2b553-77db-4b7b-b470-bb06c89c7b40",
    name: "Masjid Al-Quddus",
    url: "http://iscf.org/masjid/masijid-al-quddus/",
    timeZoneId: "America/New_York",
    address: "Orlando, FL 32805, USA",
    placeId: "ChIJ82GcWat754gRXzkl9qQdFzg",
    geo: {
      latitude: 28.5387389,
      longitude: -81.38914009999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-quddus-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "alquds-orlando-florida"),
};
