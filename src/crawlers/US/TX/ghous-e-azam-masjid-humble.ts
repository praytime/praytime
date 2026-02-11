// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "1a06332c-bfa0-4674-9c3f-fadaa54e24a7",
    name: "Ghous-e-Azam Masjid",
    url: "https://facebook.com/pages/Ghous-e-Azam-mosque/110955309032209?nr",
    timeZoneId: "America/Chicago",
    address: "5511 FM 1960, Humble, TX 77338, USA",
    placeId: "ChIJJ-bBnCzXXhQRdMmv1Gu2L6A",
    geo: {
      latitude: 30.01424,
      longitude: -95.34283169999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/ghous-e-azam-masjid-humble",
  ids,
};
