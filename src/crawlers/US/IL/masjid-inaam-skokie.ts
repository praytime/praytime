import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "298d137a-194c-4360-b553-fb2ecda9dda7",
    name: "Masjid Inaam",
    url: "https://www.google.com/maps/search/?api=1&query=none&query_place_id=ChIJL1cJamnPD4gR3gzPUhNnX2g",
    timeZoneId: "America/Chicago",
    address: "7401 Lincoln Ave, Skokie, IL 60076, USA",
    placeId: "ChIJL1cJamnPD4gR3gzPUhNnX2g",
    geo: {
      latitude: 42.0155897,
      longitude: -87.7435861,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-inaam-skokie",
  ids,
};
