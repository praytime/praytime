import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fe97d6e1-4387-4a93-a19e-0022c1e7da54",
    name: "Islamic Society of New Tampa (ISONET)",
    url: "http://www.newtampamasjid.org/",
    timeZoneId: "America/New_York",
    address: "15830 Morris Bridge Rd, Thonotosassa, FL 33592, USA",
    placeId: "ChIJ0c9eZD-0wogRyBH4G_XgN40",
    geo: {
      latitude: 28.1483333,
      longitude: -82.2805556,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-society-of-new-tampa-isonet-thonotosassa",
  ids,
};
