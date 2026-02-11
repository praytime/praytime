// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "fbea34a3-fb1a-4e4e-812c-4699eccce068",
    name: "Zia Ul Quran Masjid",
    url: "http://www.ziaulquranmasjid.com",
    timeZoneId: "America/Chicago",
    address: "2425 Carter Dr, Arlington, TX 76014, USA",
    geo: {
      latitude: 32.70426,
      longitude: -97.067223,
    },
    placeId: "ChIJzwx0vt6HToYRDo7KU3yZM5I",
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/zia-ul-quran-arlington",
  ids,
};
