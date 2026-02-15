import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0db3012d-26de-42e1-93d5-c8fc9aad1ad6",
    name: "Masjid Alrahma مسجد الرحمة",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Alrahma+%D9%85%D8%B3%D8%AC%D8%AF+%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D8%A9\u0026query_place_id\u003DChIJ8QXScuFW2YAR3GJ3v-SNnG0",
    timeZoneId: "America/Los_Angeles",
    address: "7520 El Cajon Blvd, La Mesa, CA 91942, USA",
    placeId: "ChIJ8QXScuFW2YAR3GJ3v-SNnG0",
    geo: {
      latitude: 32.7684772,
      longitude: -117.0352502,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-alrahma-msjd-lrhm-la-mesa",
  ids,
};
