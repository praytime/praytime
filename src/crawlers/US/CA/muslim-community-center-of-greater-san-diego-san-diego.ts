import {
  createMasjidAppRun,
  resolveMasjidAppPrayerUrl,
} from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const PRAYER_IFRAME_FALLBACK_URL = "https://themasjidapp.org/198/prayers";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6712513e-e66f-46f8-97d2-63cdc97b9797",
    name: "Muslim Community Center of Greater San Diego",
    url: "http://www.mccsandiego.org/",
    timeZoneId: "America/Los_Angeles",
    address: "14698 Via Fiesta, San Diego, CA 92127, USA",
    placeId: "ChIJbcF35in324ARCBcKMiyQI2U",
    geo: {
      latitude: 32.9919147,
      longitude: -117.1647551,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/CA/muslim-community-center-of-greater-san-diego-san-diego",
  ids,
  run: createMasjidAppRun(ids, {
    requireJuma: true,
    resolvePrayerUrl: () =>
      resolveMasjidAppPrayerUrl(ids[0].url, PRAYER_IFRAME_FALLBACK_URL),
  }),
};
