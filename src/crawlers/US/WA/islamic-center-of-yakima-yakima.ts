import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "22bd45fb-8982-4100-9823-00ec33aab79e",
    name: "Islamic Center of Yakima",
    url: "http://icyakima.org/",
    timeZoneId: "America/Los_Angeles",
    address: "311 S 10th Ave, Yakima, WA 98902, USA",
    placeId: "ChIJKZrOKufXmVQRxKZcsti7360",
    geo: {
      latitude: 46.59386,
      longitude: -120.520159,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-yakima-yakima",
  ids,
};
