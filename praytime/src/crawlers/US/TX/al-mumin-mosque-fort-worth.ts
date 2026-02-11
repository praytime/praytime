// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "aba6f691-98cd-43ee-810a-4ec8c41bebb8",
    name: "Al-Mu'min Mosque",
    url: "http://www.almuminmosque.org/",
    timeZoneId: "America/Chicago",
    address: "3528 Westfield Ave, Fort Worth, TX 76133, USA",
    placeId: "ChIJ74IXvGZtToYRuRw-MeI24D4",
    geo: {
      latitude: 32.6721155,
      longitude: -97.3669367,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/al-mumin-mosque-fort-worth",
  ids,
};
