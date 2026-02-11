// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "4fc99b19-2cc1-4bcc-9fe1-2ae767617a27",
    name: "Tawfiq Islamic Center",
    url: "http://www.tawfiqic.org/",
    timeZoneId: "America/Chicago",
    address: "2400 Minnehaha Ave, Minneapolis, MN 55404, USA",
    placeId: "ChIJz_rD2Ests1IREjsH8AJ5rSw",
    geo: {
      latitude: 44.958696,
      longitude: -93.24230399999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/tawfiq-islamic-center-minneapolis",
  ids,
};
