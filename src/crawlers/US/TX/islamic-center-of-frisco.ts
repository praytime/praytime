import { createMohidListRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/tx/dallas/icf/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f99c3113-9a6d-4385-8638-d9e688ae96b3",
    name: "Islamic Center of Frisco",
    url: "https://friscomasjid.org/",
    address: "11137 Frisco St, Frisco, TX 75033, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJs59GV60-TIYRaz2IAca7nV8",
    geo: {
      latitude: 33.172391,
      longitude: -96.834762,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-frisco",
  ids,
  run: createMohidListRun(ids, PRAYER_WIDGET_URL),
};
