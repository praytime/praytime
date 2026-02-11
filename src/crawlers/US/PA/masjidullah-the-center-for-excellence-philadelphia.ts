// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "4d46338a-8720-4502-8b37-118425439ddd",
    name: "Masjidullah - The Center for Excellence",
    url: "https://www.masjidullah.org/",
    timeZoneId: "America/New_York",
    address: "7401 Limekiln Pike, Philadelphia, PA 19138, USA",
    placeId: "ChIJ4Saq_Py5xokRayuBiYNcXOE",
    geo: {
      latitude: 40.0673486,
      longitude: -75.1585618,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/PA/masjidullah-the-center-for-excellence-philadelphia",
  ids,
};
