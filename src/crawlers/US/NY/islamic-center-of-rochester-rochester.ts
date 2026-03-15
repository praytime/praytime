import { createMasjidAppRun } from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1d007881-a772-4532-b97b-ce2a97e3e283",
    name: "Islamic Center of Rochester",
    url: "http://theicr.org/",
    timeZoneId: "America/New_York",
    address: "727 Westfall Rd, Rochester, NY 14620, USA",
    placeId: "ChIJRRRUptRK0YkRIQ16KKbN7PI",
    geo: {
      latitude: 43.1142939,
      longitude: -77.6019146,
    },
  },
];

const PRAYER_IFRAME_URL =
  "https://themasjidapp.org/129175/prayers?stylesheet=https://theicr.org/wp-content/uploads/prayer.css";

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-center-of-rochester-rochester",
  ids,
  run: createMasjidAppRun(ids, {
    prayerUrl: PRAYER_IFRAME_URL,
    requireJuma: true,
  }),
};
