import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "4e8d3d49-d7f4-422f-a920-1701765d494e",
    name: "Masjid al-Tawheed",
    url: "https://www.facebook.com/MasjidAlTawheed/",
    timeZoneId: "America/Los_Angeles",
    address: "1227 Sutter St, San Francisco, CA 94109, USA",
    placeId: "ChIJ-RZrT5SAhYARRP993sPBVQ8",
    geo: {
      latitude: 37.7875976,
      longitude: -122.4206391,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/masjid-al-tawheed-sf",
  ids,
};
