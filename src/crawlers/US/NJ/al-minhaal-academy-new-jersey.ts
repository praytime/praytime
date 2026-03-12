import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "2eddb291-4ba6-4361-8f41-250145733c05",
    name: "Al-Minhaal Academy",
    url: "https://plainfield.safausa.org/",
    address: "1764 New Durham Rd, South Plainfield, NJ 07080, USA",
    placeId: "ChIJFaiTJAy4w4kRU8yE9Ad6Lhg",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 40.547093,
      longitude: -74.423824,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/NJ/al-minhaal-academy-new-jersey",
  ids,
};
