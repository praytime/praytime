// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "02e0d776-442c-436a-b01c-88a881c85002",
    name: "Brooklyn Islamic Center المركز الإسلامي ببروكلين",
    url: "https://www.facebook.com/BrooklynIslamicCenter/",
    timeZoneId: "America/New_York",
    address: "2015 64th St, Brooklyn, NY 11204, USA",
    placeId: "ChIJS61yICBFwokRn_8vuK-ZOT4",
    geo: {
      latitude: 40.61700559999999,
      longitude: -73.9846694,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/brooklyn-islamic-center-lmrkz-lslmy-bbrwklyn-brooklyn",
  ids,
};
