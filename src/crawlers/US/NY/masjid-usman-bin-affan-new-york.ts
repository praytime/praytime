import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8b3351d6-8f0d-4188-a589-755db17c50ed",
    name: "Masjid Usman Bin Affan",
    url: "https://www.facebook.com/ismmnyc/",
    timeZoneId: "America/New_York",
    address: "154 E 55th St, New York, NY 10022, USA",
    placeId: "ChIJQ-_Qk-RYwokRGhAck-L3W0c",
    geo: {
      latitude: 40.75918240000001,
      longitude: -73.969292,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/masjid-usman-bin-affan-new-york",
  ids,
};
