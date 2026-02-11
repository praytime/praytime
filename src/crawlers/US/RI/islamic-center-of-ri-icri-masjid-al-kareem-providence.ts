// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "8ce4790a-f7e1-4509-91d0-f1db29b05f72",
    name: "Islamic Center of RI (ICRI) - Masjid Al-Kareem",
    url: "https://www.ricma.org/masjidalkareem",
    timeZoneId: "America/New_York",
    address: "39 Haskins St, Providence, RI 02903, USA",
    placeId: "ChIJ0d198XFF5IkRdD1QfT35Xl8",
    geo: {
      latitude: 41.8155815,
      longitude: -71.4191701,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/RI/islamic-center-of-ri-icri-masjid-al-kareem-providence",
  ids,
};
