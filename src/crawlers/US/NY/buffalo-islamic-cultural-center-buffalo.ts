// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "a6d813e3-89fb-4e88-a828-38f37c15a4dd",
    name: "Buffalo Islamic Cultural Center",
    url: "https://www.facebook.com/Buffaloicc/",
    timeZoneId: "America/New_York",
    address: "3296 Bailey Ave, Buffalo, NY 14215, USA",
    placeId: "ChIJVXZwc8hy04kR88IdEF0sqoU",
    geo: {
      latitude: 42.944629,
      longitude: -78.814055,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/buffalo-islamic-cultural-center-buffalo",
  ids,
};
