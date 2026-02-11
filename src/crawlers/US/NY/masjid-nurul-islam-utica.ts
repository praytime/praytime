// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d60e2b9c-2fb4-46f9-baec-3efbc50206e7",
    name: "Masjid Nurul Islam",
    url: "https://www.facebook.com/Masjid-Nurul-Islam-Myanmar-Muslim-Community-associations-111541207215029/",
    timeZoneId: "America/New_York",
    address: "615 Rutger St, Utica, NY 13501, USA",
    placeId: "ChIJ24MQzeFG2YkRFghlslXigPI",
    geo: {
      latitude: 43.0947967,
      longitude: -75.2215282,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-nurul-islam-utica",
  ids,
};
