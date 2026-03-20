import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fa598138-8bd5-4fc3-951e-eac72a4c0b35",
    name: "Ar-Rashid Masjid",
    url: "https://www.google.com/maps/search/?api=1&query=Ar-Rashid+Masjid&query_place_id=ChIJ9YQvR4yXyFYRzK3uTnk7BZM",
    timeZoneId: "America/Anchorage",
    address: "5841 Arctic Blvd STE 203, Anchorage, AK 99518, USA",
    placeId: "ChIJ9YQvR4yXyFYRzK3uTnk7BZM",
    geo: {
      latitude: 61.1680364,
      longitude: -149.8974459,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/AK/ar-rashid-masjid-anchorage",
  ids,
};
