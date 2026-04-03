import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/tx/fortworth/iaftnoor/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b0d736d0-5382-416c-955a-d65283d6755f",
    name: "Bayt Al-Karim Islamic Center",
    url: "https://www.dncfw.org/",
    timeZoneId: "America/Chicago",
    address: "4500 Columbus Trail, Fort Worth, TX 76133, USA",
    placeId: "ChIJuSVdOJ9tToYRjZoh3mCUzaY",
    geo: {
      latitude: 32.6287773,
      longitude: -97.3915478,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TX/bayt-al-karim-islamic-center-fort-worth",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL),
};
