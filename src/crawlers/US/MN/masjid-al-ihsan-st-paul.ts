// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "cb91718c-68cd-4b8f-ae53-e16979111200",
    name: "Masjid Al-Ihsan",
    url: "https://www.facebook.com/Masjid-Al-Ihsan-Islamic-Center-352600398203321/",
    timeZoneId: "America/Chicago",
    address: "955 W Minnehaha Ave, St Paul, MN 55104, USA",
    placeId: "ChIJubAGqikrs1IRtTeQSdobjPU",
    geo: {
      latitude: 44.96392110000001,
      longitude: -93.1421788,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-al-ihsan-st-paul",
  ids,
};
