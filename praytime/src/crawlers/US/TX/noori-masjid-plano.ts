// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "353ac868-5213-41b9-8ab3-3d7496ac328f",
    name: "Noori Masjid",
    url: "http://www.noorimasjid.org/",
    timeZoneId: "America/Chicago",
    address: "1251 Shiloh Rd, Plano, TX 75074, USA",
    geo: {
      latitude: 33.013415,
      longitude: -96.66539,
    },
    placeId: "ChIJqZaI3l8ZTIYRmMxb3T6YAhg",
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/noori-masjid-plano",
  ids,
};
