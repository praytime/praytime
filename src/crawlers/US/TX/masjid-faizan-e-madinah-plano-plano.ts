// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d7a86457-62b5-41b1-b6ce-682d030117c1",
    name: "Masjid Faizan-E-Madinah Plano",
    url: "https://masjid-faizan-e-madinah-plano.business.site/?m\u003Dtrue#summary",
    timeZoneId: "America/Chicago",
    address: "2109 W Parker Rd #220, Plano, TX 75023, USA",
    placeId: "ChIJiXn862UYTIYRlU23JyHfLtY",
    geo: {
      latitude: 33.0423843,
      longitude: -96.7346017,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-faizan-e-madinah-plano-plano",
  ids,
};
