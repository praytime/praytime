// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "194f7cd4-de6a-4d75-b23e-ce59c79a9d49",
    name: "American Albanian Islamic Center of Wisconsin",
    url: "http://aaicw.org/",
    timeZoneId: "America/Chicago",
    address: "6001 88th Ave, Kenosha, WI 53142, USA",
    placeId: "ChIJZUGzrBJhBYgRZEsO7DAyP5I",
    geo: {
      latitude: 42.5816876,
      longitude: -87.9141573,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/american-albanian-islamic-center-of-wisconsin-kenosha",
  ids,
};
