import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "52734c80-5d3b-43a1-bbc0-f614167b13fe",
    name: "Islamic Center of Plattsburgh",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DIslamic+Center+of+Plattsburgh\u0026query_place_id\u003DChIJOydFzLk4ykwRpbCD6QC1N9A",
    timeZoneId: "America/New_York",
    address: "37 Boynton Ave #4, Plattsburgh, NY 12901, USA",
    placeId: "ChIJOydFzLk4ykwRpbCD6QC1N9A",
    geo: {
      latitude: 44.70887399999999,
      longitude: -73.452789,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-center-of-plattsburgh-plattsburgh",
  ids,
};
