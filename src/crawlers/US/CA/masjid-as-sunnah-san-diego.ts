// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "08041aff-ef7c-4202-9828-44ae1d680df8",
    name: "Masjid As Sunnah",
    url: "http://markazsunnahsd.com/",
    timeZoneId: "America/Los_Angeles",
    address: "4758 Federal Blvd, San Diego, CA 92102, USA",
    placeId: "ChIJL86yavBT2YARN1qKj61N5Ys",
    geo: {
      latitude: 32.7215628,
      longitude: -117.0925925,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-as-sunnah-san-diego",
  ids,
};
