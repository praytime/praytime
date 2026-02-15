import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "82c2baa5-23eb-4f63-8695-a7a0823a2aec",
    name: "Islamic Center of Charlotte",
    url: "http://iccharlotte.org/",
    timeZoneId: "America/New_York",
    address: "1700 Progress Ln, Charlotte, NC 28205, USA",
    placeId: "ChIJHcLimisgVIgRxPjLf5odHYM",
    geo: {
      latitude: 35.208542,
      longitude: -80.76907700000001,
    },
  },
  {
    uuid4: "f012db7e-4867-4761-877b-97b72c99580b",
    name: "Harrisburg Masjid",
    url: "http://iccharlotte.org/",
    timeZoneId: "America/New_York",
    address: "200 S 17th St, Harrisburg, PA 17104, USA",
    placeId: "ChIJ76sLiubAyIkR-aG893FnbJU",
    geo: {
      latitude: 40.2642975,
      longitude: -76.86345779999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NC/islamic-center-of-charlotte-charlotte",
  ids,
};
