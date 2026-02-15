import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "55372638-d7f0-4546-b047-b7bfcb0ddaae",
    name: "Wayne State University Islamic Center of Detroit",
    url: "http://www.facebook.com/cassmosque",
    timeZoneId: "America/Detroit",
    address: "4646 Cass Ave, Detroit, MI 48201, USA",
    placeId: "ChIJMxzwUrrSJIgRTOLHPdxYVgA",
    geo: {
      latitude: 42.3536299,
      longitude: -83.0650004,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/wayne-state-university-islamic-center-of-detroit-detroit",
  ids,
};
