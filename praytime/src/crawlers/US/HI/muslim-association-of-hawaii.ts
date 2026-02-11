// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "8c7b4cff-b791-464d-800c-375efa169cfc",
    name: "Muslim Association of Hawaii",
    url: "http://www.iio.org/",
    timeZoneId: "Pacific/Honolulu",
    address: "1935 Aleo Pl, Honolulu, HI 96822, USA",
    placeId: "ChIJI-xsNbttAHwRRH94vDgqFiw",
    geo: {
      latitude: 21.3086111,
      longitude: -157.8213889,
    },
  },
  {
    uuid4: "8d52603b-3bfd-4ec4-bf40-ca3d7233f92e",
    name: "MAH Masjid Kauai",
    url: "https://www.iio.org/the-masjid/mah-on-kauai",
    timeZoneId: "Pacific/Honolulu",
    address: "4-1579 Kuhio Hwy Suite 205, Kapaʻa, HI 96746, USA",
    placeId: "ChIJteucxIHhBnwRdg6A7oamgXM",
    geo: {
      latitude: 22.0803112,
      longitude: -159.3142468,
    },
  },
  {
    uuid4: "c2cbaf51-7b8e-468d-bacc-223ad8730338",
    name: "Islamic Center of Maui (Maui Mosque)",
    url: "https://www.iio.org/the-masjid/mah-on-maui",
    timeZoneId: "Pacific/Honolulu",
    address: "270 Lalo St #105, Kahului, HI 96732, USA",
    placeId: "ChIJX7eSLKDTVHkRjH9CN5JwkXs",
    geo: {
      latitude: 20.8843671,
      longitude: -156.4572795,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/HI/muslim-association-of-hawaii",
  ids,
};
