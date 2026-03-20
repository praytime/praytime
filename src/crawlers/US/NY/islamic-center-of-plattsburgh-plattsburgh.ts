import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "52734c80-5d3b-43a1-bbc0-f614167b13fe",
    name: "Islamic Center of Plattsburgh",
    url: "https://www.google.com/maps/search/?api=1&query=Islamic+Center+of+Plattsburgh&query_place_id=ChIJwyZFzLk4ykwR7_HqdVJ17Cw",
    timeZoneId: "America/New_York",
    address: "37 Boynton Ave #4, Plattsburgh, NY 12901, USA",
    placeId: "ChIJwyZFzLk4ykwR7_HqdVJ17Cw",
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
