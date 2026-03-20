import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8a230453-5754-4d2d-93c7-6b4ae5f095a5",
    name: "Masjid Rawdah (Somali Cultural Institute)",
    url: "https://www.google.com/maps/search/?api=1&query=Masjid+Rawdah+%28Somali+Cultural+Institute%29&query_place_id=ChIJzyXrEDUts1IRrnSgZUZ5t8U",
    timeZoneId: "America/Chicago",
    address: "2426 E 26th St, Minneapolis, MN 55406, USA",
    placeId: "ChIJzyXrEDUts1IRrnSgZUZ5t8U",
    geo: {
      latitude: 44.9557452,
      longitude: -93.2365633,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-rawdah-somali-cultural-institute-minneapolis",
  ids,
};
