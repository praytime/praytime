import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1237f6d7-555a-4270-9403-1741ba3cf984",
    name: "Masjid Al-Furqan مسجد الفرقان",
    url: "https://www.facebook.com/MasjidAlfurqanPhiladelphia/",
    timeZoneId: "America/New_York",
    address: "7252 Roosevelt Blvd, Philadelphia, PA 19149, USA",
    placeId: "ChIJb9FZ8yG0xokRoakE-zh7dbU",
    geo: {
      latitude: 40.0442973,
      longitude: -75.05561569999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/masjid-al-furqan-msjd-lfrqn-philadelphia",
  ids,
};
