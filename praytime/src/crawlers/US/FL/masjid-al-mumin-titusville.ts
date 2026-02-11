// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "91de5f45-0efe-413a-9229-8f691874b431",
    name: "Masjid Al-Mumin",
    url: "https://iscf.org/masjid/masjid-al-mumin/",
    timeZoneId: "America/New_York",
    address: "1011 S Washington Ave, Titusville, FL 32780, USA",
    placeId: "ChIJ42C2eS2z4IgRVZekgIIgZoI",
    geo: {
      latitude: 28.6049697,
      longitude: -80.8073531,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/masjid-al-mumin-titusville",
  ids,
};
