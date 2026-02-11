// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ed9a6507-9dc5-44e6-b7b9-b1c4821b1046",
    name: "Masjid Al-Huda",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Al-Huda\u0026query_place_id\u003DChIJsaXiOZihlVQRCl7WgknoBiw",
    timeZoneId: "America/Los_Angeles",
    address: "436 NE 71st Ave, Portland, OR 97213, USA",
    placeId: "ChIJsaXiOZihlVQRCl7WgknoBiw",
    geo: {
      latitude: 45.5262042,
      longitude: -122.5895888,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/masjid-al-huda-portland",
  ids,
};
