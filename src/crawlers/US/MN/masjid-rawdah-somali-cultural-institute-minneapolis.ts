// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "8a230453-5754-4d2d-93c7-6b4ae5f095a5",
    name: "Masjid Rawdah (Somali Cultural Institute)",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Rawdah+%28Somali+Cultural+Institute%29\u0026query_place_id\u003DChIJxSyQGTUts1IRr3MBMsAvafw",
    timeZoneId: "America/Chicago",
    address: "2426 E 26th St, Minneapolis, MN 55406, USA",
    placeId: "ChIJxSyQGTUts1IRr3MBMsAvafw",
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
