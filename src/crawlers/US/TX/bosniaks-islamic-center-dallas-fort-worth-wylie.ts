import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c6143edf-b0bb-4ba0-8227-9e60f1454dff",
    name: "Bosniaks Islamic Center Dallas-Fort Worth",
    url: "https://www.facebook.com/BosniaksDFW/",
    timeZoneId: "America/Chicago",
    address: "2749 Elm Grove Rd, Wylie, TX 75098, USA",
    placeId: "ChIJe7bQJAkDTIYRVV161pzkUPo",
    geo: {
      latitude: 32.9676183,
      longitude: -96.5401241,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/bosniaks-islamic-center-dallas-fort-worth-wylie",
  ids,
};
