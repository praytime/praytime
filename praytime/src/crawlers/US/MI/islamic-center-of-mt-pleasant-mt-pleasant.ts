// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "5b95f36d-2d3d-4459-b3bf-be8d0669ab74",
    name: "Islamic Center of Mt Pleasant",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Center+of+Mt+Pleasant\u0026query_place_id\u003DChIJf4Y4Nk4bIogR46hKwBVjyts",
    timeZoneId: "America/Detroit",
    address: "907 Mc Vey, Mt Pleasant, MI 48858, USA",
    placeId: "ChIJf4Y4Nk4bIogR46hKwBVjyts",
    geo: {
      latitude: 43.58422509999999,
      longitude: -84.7650341,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-mt-pleasant-mt-pleasant",
  ids,
};
