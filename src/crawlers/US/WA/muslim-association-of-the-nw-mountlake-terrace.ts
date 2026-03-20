import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c62318d8-b314-45ba-a5a3-f1ebb3a15ad3",
    name: "Muslim Association of the NW",
    url: "https://www.google.com/maps/search/?api=1&query=Muslim+Association+of+the+NW&query_place_id=ChIJ72pkeREQkFQRPfXKYMX141g",
    timeZoneId: "America/Los_Angeles",
    address: "5507 238th St SW, Mountlake Terrace, WA 98043, USA",
    placeId: "ChIJ72pkeREQkFQRPfXKYMX141g",
    geo: {
      latitude: 47.783217,
      longitude: -122.307945,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/muslim-association-of-the-nw-mountlake-terrace",
  ids,
};
