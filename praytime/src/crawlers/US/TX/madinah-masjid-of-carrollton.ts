// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "3a63830f-a595-481e-8f96-484f866a4a69",
    name: "Madinah Masjid of Carrollton",
    url: "http://www.madinahmasjid.com/",
    timeZoneId: "America/Chicago",
    address: "2180 Old Denton Rd, Carrollton, TX 75006, USA",
    geo: {
      latitude: 32.975131,
      longitude: -96.90938,
    },
    placeId: "ChIJHWptiAgmTIYRAag4hOV6iAQ",
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/madinah-masjid-of-carrollton",
  ids,
};
