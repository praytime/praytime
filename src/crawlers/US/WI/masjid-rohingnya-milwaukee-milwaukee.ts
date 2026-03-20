import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "306651ec-a531-40c9-8192-b25b1fdfb1b1",
    name: "Masjid Rohingnya Milwaukee",
    url: "https://masjidmubarak.online/",
    timeZoneId: "America/Chicago",
    address: "1575 W Oklahoma Ave, Milwaukee, WI 53215, USA",
    placeId: "ChIJddlQLbMQBYgRXDYbAmdX1lw",
    geo: {
      latitude: 42.9881529,
      longitude: -87.9334941,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WI/masjid-rohingnya-milwaukee-milwaukee",
  ids,
};
