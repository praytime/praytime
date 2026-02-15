import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "84ba3334-3a66-483b-8a72-02e7893e431d",
    name: "Masjid us-Sunnah",
    url: "http://madisonmuslims.org/",
    timeZoneId: "America/Chicago",
    address: "4718 Hammersley Rd, Madison, WI 53711, USA",
    placeId: "ChIJgS8VTMCtB4gRl2UFDzZDgdI",
    geo: {
      latitude: 43.0396728,
      longitude: -89.45796680000001,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/masjid-us-sunnah-madison",
  ids,
};
