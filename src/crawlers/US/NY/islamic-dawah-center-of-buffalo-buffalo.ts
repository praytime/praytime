import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "43d61a5b-db62-4bef-920b-d5a85ab403d7",
    name: "Islamic Da'wah Center of Buffalo",
    url: "https://islamic-dawah-center-of-buffalo.business.site/",
    timeZoneId: "America/New_York",
    address: "1522 Genesee St, Buffalo, NY 14211, USA",
    placeId: "ChIJ8U7FSm4N04kRmSNQtDrT638",
    geo: {
      latitude: 42.9086364,
      longitude: -78.8240458,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-dawah-center-of-buffalo-buffalo",
  ids,
};
