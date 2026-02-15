import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d86d28f3-e676-4a62-b177-c49617b0058d",
    name: "Sarnia Masjid",
    url: "http://www.bangladesh2000.com/bdcom/islam/dir/masjid_directory_ontario.html",
    timeZoneId: "America/Toronto",
    address: "281 Cobden St, Sarnia, ON N7T 4A2, Canada",
    placeId: "ChIJq31du82cJYgRQtjgTgUdyN4",
    geo: {
      latitude: 42.9717902,
      longitude: -82.3918233,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/ON/sarnia-masjid-sarnia",
  ids,
};
