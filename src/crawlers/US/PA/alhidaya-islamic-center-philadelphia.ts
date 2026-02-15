import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "25f093b4-1d8b-4ad4-892b-7dcf76a215df",
    name: "Alhidaya Islamic Center",
    url: "https://www.facebook.com/alhidayah.center/",
    timeZoneId: "America/New_York",
    address: "123 E Luzerne St, Philadelphia, PA 19124, USA",
    placeId: "ChIJt4e8w8a3xokRsTmA2Tim8Os",
    geo: {
      latitude: 40.0110266,
      longitude: -75.1243471,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/alhidaya-islamic-center-philadelphia",
  ids,
};
