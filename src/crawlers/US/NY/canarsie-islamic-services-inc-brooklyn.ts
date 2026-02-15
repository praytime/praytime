import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3c166627-189f-4a70-a629-c3263fedada0",
    name: "Canarsie Islamic Services Inc",
    url: "https://www.google.com/maps/search/?api=1&query=Canarsie+Islamic+Services+Inc&query_place_id=ChIJBTgdQMZcwokRzDf_TxFma1A",
    timeZoneId: "America/New_York",
    address: "959 E 85th St, Brooklyn, NY 11236, USA",
    placeId: "ChIJBTgdQMZcwokRzDf_TxFma1A",
    geo: {
      latitude: 40.6369123,
      longitude: -73.9081479,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/canarsie-islamic-services-inc-brooklyn",
  ids,
};
