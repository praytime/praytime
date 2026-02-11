// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "bcc75cf0-0856-4672-be5a-0afd82737c7e",
    name: "Wausau Mosque",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DWausau+Mosque\u0026query_place_id\u003DChIJh3IhPrYhAIgRfDzlpuRtNiE",
    timeZoneId: "America/Chicago",
    address: "629 S 36th Ave, Wausau, WI 54401, USA",
    placeId: "ChIJh3IhPrYhAIgRfDzlpuRtNiE",
    geo: {
      latitude: 44.95639020000001,
      longitude: -89.6806545,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/wausau-mosque-wausau",
  ids,
};
