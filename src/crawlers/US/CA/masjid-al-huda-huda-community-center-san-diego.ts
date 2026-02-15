import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aa0f9882-a020-48de-945f-98f7233ca552",
    name: "Masjid Al Huda [Huda Community Center]",
    url: "https://www.facebook.com/HudaCommunityCenter/",
    timeZoneId: "America/Los_Angeles",
    address: "4175 Bonillo Dr, San Diego, CA 92115, USA",
    placeId: "ChIJVeCpdSBU2YARDfcGQEVpuY0",
    geo: {
      latitude: 32.7537636,
      longitude: -117.0595421,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-huda-huda-community-center-san-diego",
  ids,
};
