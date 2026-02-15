import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "6ad3faee-2bba-4832-a14a-87c64d257c6a",
    name: "Syracuse Islamic Center مسجد السلام",
    url: "https://www.facebook.com/syracuseislamiccenter/",
    timeZoneId: "America/New_York",
    address: "450 Wilkinson St, Syracuse, NY 13204, USA",
    placeId: "ChIJ0-4hnxjz2YkR2Tle0x4lXQ4",
    geo: {
      latitude: 43.051099,
      longitude: -76.170041,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/syracuse-islamic-center-msjd-lslm-syracuse",
  ids,
};
