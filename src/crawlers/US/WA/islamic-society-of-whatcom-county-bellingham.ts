import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "88d0faac-1dd6-4b3c-9cb1-e23dd0645874",
    name: "Islamic Society of Whatcom County",
    url: "http://www.isofwc.org/",
    timeZoneId: "America/Los_Angeles",
    address: "1244 Nevada St, Bellingham, WA 98229, USA",
    placeId: "ChIJX3v7MuqjhVQRe9hSRtrwNXc",
    geo: {
      latitude: 48.7441233,
      longitude: -122.4595646,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-society-of-whatcom-county-bellingham",
  ids,
};
