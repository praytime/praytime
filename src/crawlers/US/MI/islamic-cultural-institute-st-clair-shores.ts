import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "60947d73-a49e-4ebd-8d3f-7b320ea4281b",
    name: "Islamic Cultural Institute",
    url: "http://icionline.org/",
    timeZoneId: "America/Detroit",
    address: "30115 Greater Mack Ave, St Clair Shores, MI 48082, USA",
    placeId: "ChIJk1qyZZcnJYgRxLSrr2dCqZA",
    geo: {
      latitude: 42.51608710000001,
      longitude: -82.8890279,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-cultural-institute-st-clair-shores",
  ids,
};
