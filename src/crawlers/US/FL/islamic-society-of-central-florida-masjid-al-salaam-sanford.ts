import { createMawaqitMobileRun } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c2903045-0106-4061-9357-3072f91b815f",
    name: "Masjid Al-Salaam",
    url: "https://iscf.org/masjid/masjid-al-salaam/",
    timeZoneId: "America/New_York",
    address: "2917 S Orlando Dr, Sanford, FL 32773, USA",
    placeId: "ChIJL3stBDcT54gRmbrvDra_5Qc",
    geo: {
      latitude: 28.7732956,
      longitude: -81.2778915,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-society-of-central-florida-masjid-al-salaam-sanford",
  ids,
  run: createMawaqitMobileRun(ids, "assalam-sanford"),
};
