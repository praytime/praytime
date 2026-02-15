import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7b11db40-224a-4762-90ce-1622e8fa7526",
    name: "Masjid Uthman",
    url: "https://www.masjiduthman.org",
    address: "840 Oak Creek Dr, Lombard, IL 60148, USA",
    timeZoneId: "America/Chicago",
    placeId: "ChIJPypuKmhSDogRB1siIxiVoOQ",
    geo: {
      latitude: 41.85092,
      longitude: -88.031379,
    },
  },
];

// ChIJ_8hbXVlSDogRtGqqIUgA4R8 - new construction placeholder?

export const crawler: CrawlerModule = {
  name: "US/IL/masjid-uthman-lombard",
  ids,
};
