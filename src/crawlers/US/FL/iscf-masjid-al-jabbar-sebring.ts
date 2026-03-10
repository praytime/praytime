import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ce7bfa06-83ca-4a74-8824-ec91809aff58",
    name: "ISCF Masjid Al-Jabbar",
    url: "https://iscf.org/masjid/masjid-al-jabbar/",
    timeZoneId: "America/New_York",
    address: "5200 Schumacher Rd, Sebring, FL 33872, USA",
    placeId: "ChIJ3StlwHn43IgRcMS-cpdyq-c",
    geo: {
      latitude: 27.5150483,
      longitude: -81.51973079999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/iscf-masjid-al-jabbar-sebring",
  ids,
  run: createMawaqitMobileRun(ids, "aljabbar-sebring-florida"),
};
