// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "c62318d8-b314-45ba-a5a3-f1ebb3a15ad3",
    name: "Muslim Association of the NW",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMuslim+Association+of+the+NW\u0026query_place_id\u003DChIJud-YeREQkFQRJFi0aZvFxA0",
    timeZoneId: "America/Los_Angeles",
    address: "5507 238th St SW, Mountlake Terrace, WA 98043, USA",
    placeId: "ChIJud-YeREQkFQRJFi0aZvFxA0",
    geo: {
      latitude: 47.783217,
      longitude: -122.307945,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/muslim-association-of-the-nw-mountlake-terrace",
  ids,
};
