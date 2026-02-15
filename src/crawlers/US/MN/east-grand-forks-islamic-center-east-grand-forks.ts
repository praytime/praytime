import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "11f92c50-43ea-4dab-b948-253131667ea2",
    name: "East Grand Forks Islamic Center",
    url: "https://east-grand-forks-islamic-center.business.site/",
    timeZoneId: "America/Chicago",
    address: "1500 5th Ave NE, East Grand Forks, MN 56721, USA",
    placeId: "ChIJyzARsFGHxlIRWpiijEq5jis",
    geo: {
      latitude: 47.9399577,
      longitude: -97.0115606,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/east-grand-forks-islamic-center-east-grand-forks",
  ids,
};
