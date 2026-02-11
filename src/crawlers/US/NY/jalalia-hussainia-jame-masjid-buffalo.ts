// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "13ffe873-c28d-4b75-8553-a01f758c0d20",
    name: "Jalalia Hussainia Jame Masjid",
    url: "https://www.facebook.com/JalaliaJameMasjid/",
    timeZoneId: "America/New_York",
    address: "112 Wende St, Buffalo, NY 14211, USA",
    placeId: "ChIJXVS60eoN04kRus8ans4Zw4c",
    geo: {
      latitude: 42.9153543,
      longitude: -78.8148812,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/jalalia-hussainia-jame-masjid-buffalo",
  ids,
};
