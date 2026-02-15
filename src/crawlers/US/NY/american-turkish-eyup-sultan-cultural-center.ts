import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a2042c53-52f2-4145-99e9-96e4a5034adc",
    name: "American Turkish Eyup Sultan Cultural Center",
    url: "https://eyupsultan.business.site/",
    timeZoneId: "America/New_York",
    address: "2814 Brighton 3rd St, Brooklyn, NY 11235, USA",
    placeId: "ChIJK9minUREwokRfUKMnuYYHb8",
    geo: {
      latitude: 40.58262060000001,
      longitude: -73.9656929,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/american-turkish-eyup-sultan-cultural-center",
  ids,
};
