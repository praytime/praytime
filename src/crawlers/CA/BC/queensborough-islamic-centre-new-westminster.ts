import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "b8d65560-ac51-4b19-87a0-8b28b2c0e117",
    name: "Queensborough Islamic Centre",
    url: "http://www.awqat.net/Masjids/BCQueensBNW/qbnw.html",
    timeZoneId: "America/Vancouver",
    address: "205 Wood St, New Westminster, BC V3M 5K5, Canada",
    placeId: "ChIJQ4mQvY3YhVQRPqc1_gue1SA",
    geo: {
      latitude: 49.1871085,
      longitude: -122.9369715,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/BC/queensborough-islamic-centre-new-westminster",
  ids,
};
