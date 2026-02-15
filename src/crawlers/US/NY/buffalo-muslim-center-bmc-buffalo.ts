import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "44ced7fa-ff55-40cb-b467-c4e6b869aa88",
    name: "Buffalo Muslim Center (BMC)",
    url: "http://buffalomuslimcenter.com/",
    timeZoneId: "America/New_York",
    address: "995 Fillmore Ave, Buffalo, NY 14211, USA",
    placeId: "ChIJ7ysJiGcT04kRUaOVEKgaJUc",
    geo: {
      latitude: 42.90037369999999,
      longitude: -78.83882539999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/buffalo-muslim-center-bmc-buffalo",
  ids,
};
