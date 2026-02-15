import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f7b9500c-8304-408e-b3ac-cf83846ee5b7",
    name: "Wali Mahmoud Islamic Center",
    url: "http://projects.leadr.msu.edu/malcolmxinlansing/items/show/7",
    timeZoneId: "America/Detroit",
    address: "235 Lahoma St, Lansing, MI 48915, USA",
    placeId: "ChIJ_TicDYLqIogRGFK0mhQmg6I",
    geo: {
      latitude: 42.7358909,
      longitude: -84.5706299,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/wali-mahmoud-islamic-center-lansing",
  ids,
};
