// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "008c6526-5455-4fb4-9d85-11983ad97c50",
    name: "Masjid As Sunnah Temporary Location",
    url: "http://masjidsunnah.org/",
    timeZoneId: "America/Detroit",
    address: "2164 Division Ave S, Grand Rapids, MI 49507, USA",
    placeId: "ChIJC424rSSzGYgRRm4NzXdZIKQ",
    geo: {
      latitude: 42.923871,
      longitude: -85.6662635,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/masjid-as-sunnah-temporary-location-grand-rapids",
  ids,
};
