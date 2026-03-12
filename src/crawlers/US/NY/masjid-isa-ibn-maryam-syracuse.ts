import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8255b917-adb0-4d5a-9aeb-685783173fde",
    name: "Masjid Isa Ibn Maryam",
    url: "http://masjidisa.com/",
    timeZoneId: "America/New_York",
    address: "501 Park St, Syracuse, NY 13203, USA",
    placeId: "ChIJAxeGqVPy2YkRIdJkAvSDE4M",
    geo: {
      latitude: 43.062653,
      longitude: -76.1403164,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NY/masjid-isa-ibn-maryam-syracuse",
  ids,
  run: createMasjidalRun(ids, "VKpe7OLP", { jumaMode: "none" }),
};
