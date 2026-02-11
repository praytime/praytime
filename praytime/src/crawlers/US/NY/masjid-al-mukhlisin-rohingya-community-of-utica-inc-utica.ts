// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ad6de3aa-fb0e-40dc-b1c5-55c0a5eeedce",
    name: "MASJID AL MUKHLISIN.ROHINGYA COMMUNITY OF UTICA,INC",
    url: "http://masjidalmukhlisin.com/masjid/",
    timeZoneId: "America/New_York",
    address: "1565 Howard Ave, Utica, NY 13501, USA",
    placeId: "ChIJqf_TZZVH2YkRXhiBJh6QsIU",
    geo: {
      latitude: 43.0863229,
      longitude: -75.2382208,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-al-mukhlisin-rohingya-community-of-utica-inc-utica",
  ids,
};
