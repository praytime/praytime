import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "27899471-73f6-496a-93c6-05ba8dc0fe63",
    name: "IONA",
    url: "http://ionamasjid.org/",
    timeZoneId: "America/Detroit",
    address: "28630 Ryan Rd, Warren, MI 48092, USA",
    placeId: "ChIJ-7L22qXaJIgRS77SCtc4oTw",
    geo: {
      latitude: 42.50338199999999,
      longitude: -83.066619,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/iona-warren",
  ids,
};
