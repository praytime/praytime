import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "779b533c-5775-4025-8253-bfc118c01f12",
    name: "Islamic Society of Sheboygan",
    url: "https://www.islamicsocietysheboygan.org/",
    timeZoneId: "America/Chicago",
    address: "9110 Sauk Trail Rd, Oostburg, WI 53070, USA",
    placeId: "ChIJf6d1tpykBIgRWvCrFCBbRqo",
    geo: {
      latitude: 43.6444902,
      longitude: -87.77204309999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/islamic-society-of-sheboygan-oostburg",
  ids,
};
