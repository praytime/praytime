import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c5b3bd69-5d6e-4bcc-bd92-a916f7f6dd53",
    name: "Muslim Center of New York",
    url: "https://muslimcenter.org/",
    timeZoneId: "America/New_York",
    address: "137-58 Geranium Ave, Queens, NY 11355, USA",
    placeId: "ChIJr-0SaKNhwokRiA8kCZz2WBc",
    geo: {
      latitude: 40.75085,
      longitude: -73.820452,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/muslim-center-of-new-york-queens",
  ids,
};
