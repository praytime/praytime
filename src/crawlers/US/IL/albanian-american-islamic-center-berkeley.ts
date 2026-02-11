// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "0505b19b-422f-48a8-97ef-73c07c5c7cde",
    name: "Albanian-American Islamic Center",
    url: "https://www.facebook.com/XHAMIJASHQIP/",
    timeZoneId: "America/Chicago",
    address: "5825 St Charles Rd, Berkeley, IL 60163, USA",
    placeId: "ChIJrfgtw0VLDogRp0Rq5ndprvU",
    geo: {
      latitude: 41.88916340000001,
      longitude: -87.9143776,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/albanian-american-islamic-center-berkeley",
  ids,
};
