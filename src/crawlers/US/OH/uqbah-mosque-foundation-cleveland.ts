// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "65ab43d4-6775-4793-8dcb-5a8a03b6058a",
    name: "Uqbah Mosque Foundation",
    url: "https://www.tumf.org/",
    timeZoneId: "America/New_York",
    address: "2222 Stokes Blvd, Cleveland, OH 44106, USA",
    placeId: "ChIJwy103oP7MIgRv8hHXyh2MnU",
    geo: {
      latitude: 41.4979,
      longitude: -81.60929999999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OH/uqbah-mosque-foundation-cleveland",
  ids,
};
