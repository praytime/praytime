// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d24a471f-7128-4822-988c-7592634d47c6",
    name: "Masjid Al Quran",
    url: "https://www.facebook.com/MasjidAlQuranDallasTx/",
    timeZoneId: "America/Chicago",
    address: "2420 Cedar Crest Blvd, Dallas, TX 75203, USA",
    placeId: "ChIJCTle0DSYToYRTNhGbvt_b34",
    geo: {
      latitude: 32.7343184,
      longitude: -96.7919943,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/masjid-al-quran-dallas",
  ids,
};
