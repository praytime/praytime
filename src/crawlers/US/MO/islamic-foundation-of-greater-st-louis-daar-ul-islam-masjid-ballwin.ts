import { createMadinaAppsRun } from "../../../madinaapps";
import type { CrawlerModule } from "../../../types";

const MADINAAPPS_CLIENT_ID = "232";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "24e23e22-5290-48df-adf6-3aa3adc165d3",
    name: "Islamic Foundation of Greater St. Louis (Daar Ul-Islam Masjid)",
    url: "http://islamstl.org/",
    timeZoneId: "America/Chicago",
    address: "517 Weidman Rd, Ballwin, MO 63011, USA",
    placeId: "ChIJtyXiEK_T2IcRwJ_B3WzW0xY",
    geo: {
      latitude: 38.6031468,
      longitude: -90.4962504,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MO/islamic-foundation-of-greater-st-louis-daar-ul-islam-masjid-ballwin",
  ids,
  run: createMadinaAppsRun(ids, MADINAAPPS_CLIENT_ID),
};
