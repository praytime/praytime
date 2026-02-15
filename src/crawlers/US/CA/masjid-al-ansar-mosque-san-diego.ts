import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8a6a2606-fbe3-4ed9-a9d5-64ef4dabf10d",
    name: "Masjid Al-Ansar Mosque",
    url: "http://masjidansar.org/",
    timeZoneId: "America/Los_Angeles",
    address: "4014 Winona Ave, San Diego, CA 92105, USA",
    placeId: "ChIJrTR7qhlU2YARtq73vLYMnU8",
    geo: {
      latitude: 32.7498244,
      longitude: -117.0882755,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-ansar-mosque-san-diego",
  ids,
};
