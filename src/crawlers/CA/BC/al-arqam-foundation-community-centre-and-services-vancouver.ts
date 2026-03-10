import { createAwqatPageRun } from "../../../awqat";
import type { CrawlerModule } from "../../../types";

const AWQAT_URL = "http://www.awqat.net/Masjids/BCAlArqam/bcalarqam.html";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "cdecd5be-ecfb-440a-90e1-684d4b1fe943",
    name: "Al Arqam Foundation Community Centre and Services",
    url: "http://www.arqam.ca/",
    timeZoneId: "America/Vancouver",
    address: "8250 Fraser St, Vancouver, BC V5X 3X6, Canada",
    placeId: "ChIJkZZTZUB1hlQRx4G9mNGyMIQ",
    geo: {
      latitude: 49.20967809999999,
      longitude: -123.0907952,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/BC/al-arqam-foundation-community-centre-and-services-vancouver",
  ids,
  run: createAwqatPageRun(ids, AWQAT_URL),
};
