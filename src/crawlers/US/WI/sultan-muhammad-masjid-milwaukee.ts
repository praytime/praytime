import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "03b29114-be4b-452e-b584-8fd9568130c6",
    name: "Sultan Muhammad Masjid",
    url: "https://www.facebook.com/Sultan-Muhammad-Islamic-Center-651855304970906/",
    timeZoneId: "America/Chicago",
    address: "323 W Wright St, Milwaukee, WI 53212, USA",
    placeId: "ChIJR1lmTEcZBYgRQV8BtnaTiWU",
    geo: {
      latitude: 43.0638358,
      longitude: -87.9147096,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/sultan-muhammad-masjid-milwaukee",
  ids,
};
