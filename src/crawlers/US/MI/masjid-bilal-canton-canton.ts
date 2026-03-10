import { createMohidListRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/mi/ypsillanti/mb/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e1fb1633-e0aa-4e61-911a-8e7aa600ebd4",
    name: "Masjid Bilal Canton",
    url: "https://www.masjidbilalcanton.org/",
    timeZoneId: "America/Detroit",
    address: "1525 Ridge Rd N, Canton, MI 48187, USA",
    placeId: "ChIJXYr6aUJUO4gR-fYI3dMvjPQ",
    geo: {
      latitude: 42.31654,
      longitude: -83.530075,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/masjid-bilal-canton-canton",
  ids,
  run: createMohidListRun(ids, PRAYER_WIDGET_URL, { jumaLimit: 2 }),
};
