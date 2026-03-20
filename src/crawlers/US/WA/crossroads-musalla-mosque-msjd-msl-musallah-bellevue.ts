import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/wa/bellevue/mmblv/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "39a90e54-4685-4b78-928a-a74db25e2f49",
    name: "Crossroads Musalla Mosque مسجد مصلى Musallah",
    url: "https://masjidmadeena.org/",
    timeZoneId: "America/Los_Angeles",
    address: "827 164th Ave NE, Bellevue, WA 98008, USA",
    placeId: "ChIJL-zpaLdtkFQRECFsuDUHy6o",
    geo: {
      latitude: 47.61784129999999,
      longitude: -122.1221867,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/crossroads-musalla-mosque-msjd-msl-musallah-bellevue",
  ids,
  run: createMohidWidgetRun(ids, PRAYER_WIDGET_URL),
};
