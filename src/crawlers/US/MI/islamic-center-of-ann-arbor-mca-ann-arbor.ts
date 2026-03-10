import { createPrayerTimesAjaxRun } from "../../../prayertimesajax";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dd1bc539-cafe-4f39-b21d-f2a51e9040e7",
    name: "Islamic Center of Ann Arbor (MCA)",
    url: "https://mca-a2.org/",
    timeZoneId: "America/Detroit",
    address: "2301 Plymouth Rd, Ann Arbor, MI 48105, USA",
    placeId: "ChIJoTX09ymsPIgRO8InMPpKP-4",
    geo: {
      latitude: 42.3011923,
      longitude: -83.714602,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-ann-arbor-mca-ann-arbor",
  ids,
  run: createPrayerTimesAjaxRun(
    ids,
    "https://mca-a2.org/wp-admin/admin-ajax.php",
    {
      errorContext: "MCA prayer_times ajax response",
      jumaFallback: ["2:00 PM"],
    },
  ),
};
