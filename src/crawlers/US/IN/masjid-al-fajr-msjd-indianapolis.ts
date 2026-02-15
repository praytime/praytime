import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8f261680-c137-4b90-99a9-cade49bb496a",
    name: "Masjid Al-Fajr مسجد",
    url: "http://www.theimcaonline.org/",
    timeZoneId: "America/Indiana/Indianapolis",
    address: "2846 Cold Spring Rd, Indianapolis, IN 46222, USA",
    placeId: "ChIJVVEdlO9Wa4gR3cak3sMJrcA",
    geo: {
      latitude: 39.8073276,
      longitude: -86.2037103,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IN/masjid-al-fajr-msjd-indianapolis",
  ids,
};
