// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "56b93faf-9321-40c3-aa4e-a18ba942118d",
    name: "As-Siddiq Institute \u0026 Mosque",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DAs-Siddiq+Institute+%26+Mosque\u0026query_place_id\u003DChIJdwxPqSl_I4gRnW_mqA5B_LM",
    timeZoneId: "America/Detroit",
    address: "4417 Saginaw St, Burton, MI 48529, USA",
    placeId: "ChIJdwxPqSl_I4gRnW_mqA5B_LM",
    geo: {
      latitude: 42.963629,
      longitude: -83.669928,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/as-siddiq-institute-and-mosque-burton",
  ids,
};
