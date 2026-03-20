import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "82bbfa89-8d28-4970-a5e9-a9c56b042729",
    name: "Masjid Omar Islamic Center",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Omar+Islamic+Center&query_place_id=ChIJk-Xkvqkys1IRifRc5By1Vds",
    timeZoneId: "America/Chicago",
    address: "912 E 24th St, Minneapolis, MN 55404, USA",
    placeId: "ChIJk-Xkvqkys1IRifRc5By1Vds",
    geo: {
      latitude: 44.9595649,
      longitude: -93.2604554,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-omar-islamic-center-minneapolis",
  ids,
};
