import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f54c0f44-c8fe-4b72-846c-c0e42d3460c7",
    name: "Islamic Center of Washington DC",
    url: "https://theislamiccenter.us/",
    timeZoneId: "America/New_York",
    address: "2551 Massachusetts Ave NW, Washington, DC 20008, USA",
    placeId: "ChIJLbP40DK2t4kRuoplPNhTABs",
    geo: {
      latitude: 38.9171356,
      longitude: -77.05671199999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/DC/islamic-center-of-washington-dc-washington",
  ids,
};
