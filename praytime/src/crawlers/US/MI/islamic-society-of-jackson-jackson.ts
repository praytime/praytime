// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "9993bce4-dc25-4c4d-8901-8126dedc7338",
    name: "Islamic Society of Jackson",
    url: "https://www.facebook.com/jacksonmasjid/",
    timeZoneId: "America/Detroit",
    address: "410 McNeal St, Jackson, MI 49203, USA",
    placeId: "ChIJs1rUuhUlPYgRoi1vmGNmQGM",
    geo: {
      latitude: 42.23529269999999,
      longitude: -84.4155679,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-society-of-jackson-jackson",
  ids,
};
