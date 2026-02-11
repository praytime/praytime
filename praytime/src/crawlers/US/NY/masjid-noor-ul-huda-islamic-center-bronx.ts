// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "277609d0-f4fa-4154-87e6-82607c964ff9",
    name: "Masjid Noor-ul-Huda Islamic Center",
    url: "https://www.facebook.com/masjidnoorulhuda/",
    timeZoneId: "America/New_York",
    address: "3033 Young Ave, Bronx, NY 10469, USA",
    placeId: "ChIJSWONYEnzwokRF7XAY5xWbe8",
    geo: {
      latitude: 40.8703961,
      longitude: -73.84810639999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-noor-ul-huda-islamic-center-bronx",
  ids,
};
