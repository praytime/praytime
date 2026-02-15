import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3d04660f-54f1-45ef-a654-ab40f3d0ca08",
    name: "American BH Islamic Center of Utica",
    url: "http://www.dzematutica.net/",
    timeZoneId: "America/New_York",
    address: "407 Kossuth Ave, Utica, NY 13501, USA",
    placeId: "ChIJGaI6AwNH2YkRsDK3ZfFqBlQ",
    geo: {
      latitude: 43.096635,
      longitude: -75.21066429999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/american-bh-islamic-center-of-utica-utica",
  ids,
};
