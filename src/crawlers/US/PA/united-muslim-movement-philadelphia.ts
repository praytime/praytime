import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "049d4fb4-ce07-47ca-bdd3-80a5257b36aa",
    name: "United Muslim Movement",
    url: "https://www.ummonline.org/",
    timeZoneId: "America/New_York",
    address: "810 S 15th St, Philadelphia, PA 19146, USA",
    placeId: "ChIJ46wWbD3GxokR9L1C4ev1vp8",
    geo: {
      latitude: 39.9407382,
      longitude: -75.16809909999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/united-muslim-movement-philadelphia",
  ids,
};
