// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "69584aec-a83b-47f0-9d96-84b8ede4c340",
    name: "Islamic Center of Galveston - Masjid",
    url: "https://www.galvestonislamiccenter.org/",
    timeZoneId: "America/Chicago",
    address: "921 Broadway Avenue J, Galveston, TX 77550, USA",
    placeId: "ChIJNz0z1U6eP4YR2M-4moirLbY",
    geo: {
      latitude: 29.30378,
      longitude: -94.7765502,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/islamic-center-of-galveston-masjid-galveston",
  ids,
};
