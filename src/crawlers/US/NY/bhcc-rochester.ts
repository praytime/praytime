import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "683eef67-d18c-49fd-9ef0-596193b0add0",
    name: "BHCC",
    url: "http://bhccrochester.org/",
    timeZoneId: "America/New_York",
    address: "312 Fisher Rd, Rochester, NY 14624, USA",
    placeId: "ChIJIYnuJdBM0YkR1dm2gQY5cas",
    geo: {
      latitude: 43.1174869,
      longitude: -77.688391,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/bhcc-rochester",
  ids,
};
