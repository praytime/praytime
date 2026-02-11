// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "99bdcec5-aa35-4e12-b9ee-f176b3ae1550",
    name: "Muslim American Society Youth Center",
    url: "http://www.masyc.org/",
    timeZoneId: "America/New_York",
    address: "1933 Bath Ave, Brooklyn, NY 11214, USA",
    placeId: "ChIJUUW6sgtFwokRWf0ESIgBX_c",
    geo: {
      latitude: 40.60232680000001,
      longitude: -74.0027085,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/muslim-american-society-youth-center",
  ids,
};
