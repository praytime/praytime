import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/wa/bellevue/mmblv/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0b614d35-724a-4483-bad5-5f20444dd069",
    name: "Masjid Madeena",
    url: "https://masjidmadeena.org/",
    timeZoneId: "America/Los_Angeles",
    address: "15935 NE 8th St Suite B100, Bellevue, WA 98008, USA",
    geo: {
      latitude: 47.616337,
      longitude: -122.127469,
    },
    placeId: "ChIJL-zpaLdtkFQRECFsuDUHy6o",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/masjid-madeena-bellevue",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL),
};
