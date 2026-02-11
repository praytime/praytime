// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "b6336492-8c42-4226-9430-063927565251",
    name: "Islamic Center of Wisconsin",
    url: "http://www.appletonmasjid.org/",
    timeZoneId: "America/Chicago",
    address: "720 W Parkway Blvd, Appleton, WI 54914, USA",
    placeId: "ChIJj0cKxd62A4gRcfe3L4JQRbo",
    geo: {
      latitude: 44.27803309999999,
      longitude: -88.41646159999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/islamic-center-of-wisconsin-appleton",
  ids,
};
