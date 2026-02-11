// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "d114ef5e-9150-438b-8344-7ee20305c7af",
    name: "Masjid Al-Huda - Islamic Cultural Community Center",
    url: "http://www.alhudacenter.org/",
    timeZoneId: "America/Chicago",
    address: "2534 NE Central Ave, Minneapolis, MN 55418, USA",
    placeId: "ChIJ28vm0-sts1IR9jpLFPlyLNU",
    geo: {
      latitude: 45.01433259999999,
      longitude: -93.2475958,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-al-huda-islamic-cultural-community-center-minneapolis",
  ids,
};
