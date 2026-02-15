import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1d7a1a67-a8d0-48fa-99bd-1464996ab4a8",
    name: "Muslim Community Center of Portland",
    url: "http://mccpdx.org/",
    timeZoneId: "America/Los_Angeles",
    address: "5325 N Vancouver Ave, Portland, OR 97217, USA",
    placeId: "ChIJ9yb00A-nlVQR5kT750973S4",
    geo: {
      latitude: 45.562213,
      longitude: -122.6690679,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/muslim-community-center-of-portland-portland",
  ids,
};
