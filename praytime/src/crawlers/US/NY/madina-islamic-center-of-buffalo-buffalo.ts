// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "2f178cf8-1e44-40cf-9257-b2f4ecc77143",
    name: "Madina Islamic Center of Buffalo",
    url: "https://www.facebook.com/Madinah-Masjid-249053159304134/",
    timeZoneId: "America/New_York",
    address: "252 E Utica St, Buffalo, NY 14208, USA",
    placeId: "ChIJqz9hu7AT04kROA63WHcLUxY",
    geo: {
      latitude: 42.9113756,
      longitude: -78.85635649999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/madina-islamic-center-of-buffalo-buffalo",
  ids,
};
