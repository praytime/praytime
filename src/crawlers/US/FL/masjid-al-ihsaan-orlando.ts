import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1cdf0dc5-559b-4521-ad46-da5cf6aa22d1",
    name: "Masjid Al-Ihsaan",
    url: "http://masjidalihsaan.org/",
    timeZoneId: "America/New_York",
    address: "6630 Pershing Ave, Orlando, FL 32822, USA",
    placeId: "ChIJ4yKiZn1k54gRouNYsAnunE8",
    geo: {
      latitude: 28.498652,
      longitude: -81.29546100000002,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-ihsaan-orlando",
  ids,
  run: createMawaqitMobileRun(ids, "alihsaan-orlando"),
};
