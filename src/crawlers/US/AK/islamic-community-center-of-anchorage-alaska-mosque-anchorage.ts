import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7de28a7a-ebde-4fc1-bd28-858940da4154",
    name: "Islamic Community Center of Anchorage (Alaska Mosque)",
    url: "http://www.alaskamasjid.com/",
    timeZoneId: "America/Anchorage",
    address: "8005 Spring St, Anchorage, AK 99518, USA",
    placeId: "ChIJb8KJV5KXyFYRBNTQUuUkJkk",
    geo: {
      latitude: 61.1482304,
      longitude: -149.8611187,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/AK/islamic-community-center-of-anchorage-alaska-mosque-anchorage",
  ids,
};
