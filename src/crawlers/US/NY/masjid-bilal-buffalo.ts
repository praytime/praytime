import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "52eb1465-578c-48b0-8447-da4cca280242",
    name: "Masjid Bilal",
    url: "https://www.biccmasjidbilal.net/",
    timeZoneId: "America/New_York",
    address: "364 Grant St, Buffalo, NY 14213, USA",
    placeId: "ChIJIYvQCbwT04kRZQv6zV5i4sM",
    geo: {
      latitude: 42.9238253,
      longitude: -78.8901873,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-bilal-buffalo",
  ids,
};
