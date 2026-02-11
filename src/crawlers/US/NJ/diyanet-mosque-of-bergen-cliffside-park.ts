// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "a4c8a58a-2539-417d-a158-aa36d3aa17a4",
    name: "Diyanet Mosque of Bergen",
    url: "https://diyanetamerica.org/mosques/bergen-diyanet-mosque/",
    timeZoneId: "America/New_York",
    address: "240 Knox Ave, Cliffside Park, NJ 07010, USA",
    placeId: "ChIJ56FGzqz3wokRJpuBfjUTU2E",
    geo: {
      latitude: 40.8274728,
      longitude: -73.9837091,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NJ/diyanet-mosque-of-bergen-cliffside-park",
  ids,
};
