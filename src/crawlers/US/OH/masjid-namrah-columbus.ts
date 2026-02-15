import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f105e4eb-dc8c-4bcf-8a59-7dabd7c768cc",
    name: "Masjid Namrah",
    url: "https://www.facebook.com/namrahohio/",
    timeZoneId: "America/New_York",
    address: "4501 Refugee Rd, Columbus, OH 43232, USA",
    placeId: "ChIJo23G6Tp9OIgRQBjG_sbL3to",
    geo: {
      latitude: 39.9146584,
      longitude: -82.87624199999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OH/masjid-namrah-columbus",
  ids,
};
