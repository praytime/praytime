// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "b674cc3a-2628-4220-a550-3b5b430144aa",
    name: "MAS Bronx Muslim Center (Muslim American Society of Upper New York)",
    url: "https://www.facebook.com/bxmuslimcenter/",
    timeZoneId: "America/New_York",
    address: "702 Rhinelander Ave, Bronx, NY 10462, USA",
    placeId: "ChIJjcF6GZj0wokRUPgqK4Vs0oU",
    geo: {
      latitude: 40.8474069,
      longitude: -73.8665295,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/mas-bronx-muslim-center-muslim-american-society-of-upper-new-york-bronx",
  ids,
};
