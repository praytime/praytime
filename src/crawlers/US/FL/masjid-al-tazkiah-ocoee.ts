import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "94b09c4f-615d-4ca3-8847-97eb55b14773",
    name: "Masjid Al Tazkiah",
    url: "https://www.foundationoflights.org/",
    timeZoneId: "America/New_York",
    address: "120 Floral St, Ocoee, FL 34761, USA",
    placeId: "ChIJ66Ei3OiC54gR-PXPlK1M2lU",
    geo: {
      latitude: 28.5680749,
      longitude: -81.5463109,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-tazkiah-ocoee",
  ids,
  run: createMawaqitMobileRun(ids, "altazkiah-ocoee"),
};
