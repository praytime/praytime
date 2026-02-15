import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3f3820b0-2e90-4253-a9ea-bff801bc292d",
    name: "Masjid Al-Furqan",
    url: "http://ourmosque.us/",
    timeZoneId: "America/Los_Angeles",
    address: "9401 18th Ave SW, Seattle, WA 98106, USA",
    placeId: "ChIJqZFdWvFBkFQRy_MqzfDYIBs",
    geo: {
      latitude: 47.5190563,
      longitude: -122.3580815,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/masjid-al-furqan-seattle",
  ids,
};
