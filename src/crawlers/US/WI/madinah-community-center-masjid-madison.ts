import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f5ff1c33-81ac-49de-bbe2-f212e9e63dd1",
    name: "Madinah Community Center - Masjid",
    url: "https://madisonmuslims.org/new-masjid-project/",
    timeZoneId: "America/Chicago",
    address: "6514 Watts Rd, Madison, WI 53719, USA",
    placeId: "ChIJUUIhTMCtB4gRzQ_OZJM0Ggc",
    geo: {
      latitude: 43.0505745,
      longitude: -89.4939637,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WI/madinah-community-center-masjid-madison",
  ids,
};
