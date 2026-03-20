import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6b2c0a61-2e6f-4b5f-8451-119ec0c55c5d",
    name: "Omar Bin Alkhetab Masjid",
    url: "https://www.google.com/maps/search/?api=1&query=Omar+Bin+Alkhetab+Masjid&query_place_id=ChIJUaI60nGbskwRbLpHi17sqEc",
    timeZoneId: "America/New_York",
    address: "978 Washington Ave, Portland, ME 04103, USA",
    placeId: "ChIJUaI60nGbskwRbLpHi17sqEc",
    geo: {
      latitude: 43.6894038,
      longitude: -70.2756532,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ME/omar-bin-alkhetab-masjid-portland",
  ids,
};
