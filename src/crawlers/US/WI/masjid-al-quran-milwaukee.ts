import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "482bb7de-d026-4064-9eb2-6cbe1d0098a4",
    name: "Masjid Al-Qur'an",
    url: "https://www.alquranmke.org/",
    timeZoneId: "America/Chicago",
    address: "11723 W Brown Deer Rd, Milwaukee, WI 53224, USA",
    placeId: "ChIJGaXwiZj9BIgRZoLPmCAp_Zw",
    geo: {
      latitude: 43.1764066,
      longitude: -88.0582869,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WI/masjid-al-quran-milwaukee",
  ids,
  run: createMasjidalRun(ids, "0aAejzdj", { jumaCount: 1 }),
};
