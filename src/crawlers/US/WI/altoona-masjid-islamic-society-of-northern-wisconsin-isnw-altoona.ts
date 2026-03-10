import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "90dc4459-9d89-4693-97de-bb7eb672df30",
    name: "Altoona Masjid (Islamic Society of Northern Wisconsin (ISNW))",
    url: "http://altoonamasjid.com/contact-us/",
    timeZoneId: "America/Chicago",
    address: "527 2nd St W, Altoona, WI 54720, USA",
    placeId: "ChIJO12jg4K7-IcRobR6JyQZcLo",
    geo: {
      latitude: 44.8038729,
      longitude: -91.43615989999999,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WI/altoona-masjid-islamic-society-of-northern-wisconsin-isnw-altoona",
  ids,
  run: createMasjidalRun(ids, "OMA5JNdr", { jumaCount: 1 }),
};
