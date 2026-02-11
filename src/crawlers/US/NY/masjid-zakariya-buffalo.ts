// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "9f6f4b9d-74e0-40ed-8274-e628072ed926",
    name: "Masjid Zakariya",
    url: "https://www.google.com/maps/search/?api\u003D1\u0026query\u003DMasjid+Zakariya\u0026query_place_id\u003DChIJMfL-UH8N04kRKoD3wFpT4UQ",
    timeZoneId: "America/New_York",
    address: "182 Sobieski St, Buffalo, NY 14212, USA",
    placeId: "ChIJMfL-UH8N04kRKoD3wFpT4UQ",
    geo: {
      latitude: 42.8989779,
      longitude: -78.833162,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-zakariya-buffalo",
  ids,
};
