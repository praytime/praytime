// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "71ca4c0e-14f6-46df-b71c-ee0d83bce823",
    name: "Jamia Masjid",
    url: "http://lasvegasmasjid.com/",
    timeZoneId: "America/Los_Angeles",
    address: "4730 E Desert Inn Rd, Las Vegas, NV 89121, USA",
    placeId: "ChIJMc5l8iHbyIARWMVjCP3XocM",
    geo: {
      latitude: 36.13,
      longitude: -115.0716667,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NV/jamia-masjid-las-vegas",
  ids,
};
