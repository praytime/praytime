import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "163799c7-ff19-42be-9456-8ff4ee374fd1",
    name: "ICBMN-Islamic Community of Bosniaks in Minnesota",
    url: "http://icbmn.org/",
    timeZoneId: "America/Chicago",
    address: "668 Broadway St NE, Minneapolis, MN 55413, USA",
    placeId: "ChIJv9h_IoUts1IRWdQYStFJ1oA",
    geo: {
      latitude: 44.99854999999999,
      longitude: -93.2545389,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/icbmn-islamic-community-of-bosniaks-in-minnesota-minneapolis",
  ids,
};
