import type { CrawlerModule } from "../../../types";

// TODO: 'incapsula' prevents scraping of the page.
const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a2723b2e-f0e5-4d3d-b83d-5d69e81b4658",
    name: "Islamic Institute of Orange County",
    url: "http://www.iioc.com/",
    timeZoneId: "America/Los_Angeles",
    address: "1220 N State College Blvd, Anaheim, CA 92806, USA",
    placeId: "ChIJ384lGmbW3IARsh7B8qwiX6U",
    geo: {
      latitude: 33.851781,
      longitude: -117.888751,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-institute-of-orange-county-anaheim",
  ids,
};
