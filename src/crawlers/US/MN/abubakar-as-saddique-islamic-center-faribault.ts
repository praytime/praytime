// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f6290240-8240-4eee-9b22-93ce4156313f",
    name: "Abubakar As-Saddique Islamic Center",
    url: "https://abubakar-as-saddique-masjid-of-faribault.business.site/",
    timeZoneId: "America/Chicago",
    address: "1201 Division St W, Faribault, MN 55021, USA",
    placeId: "ChIJTfBnejv39ocRPKsZJxB8V_o",
    geo: {
      latitude: 44.2903347,
      longitude: -93.2863737,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/abubakar-as-saddique-islamic-center-faribault",
  ids,
};
