import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "fead9137-a53a-411f-a030-eecf8f2b7488",
    name: "Al-Huda Islamic Center",
    url: "https://www.facebook.com/Al-huda-Islamic-Center-East-Grand-Forks-MN-276706629615392/",
    timeZoneId: "America/Chicago",
    address: "1401 Central Ave NW, East Grand Forks, MN 56721, USA",
    placeId: "ChIJO7WTZQSHxlIR2rsy_SOZiZc",
    geo: {
      latitude: 47.93852189999999,
      longitude: -97.02087270000001,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/al-huda-islamic-center-east-grand-forks",
  ids,
};
