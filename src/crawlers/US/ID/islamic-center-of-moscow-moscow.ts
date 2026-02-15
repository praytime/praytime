import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9c9b0845-0213-4762-9c60-2bc4ee06e238",
    name: "Islamic Center of Moscow",
    url: "http://spokaneislamiccenter.org/?page_id\u003D3013",
    timeZoneId: "America/Los_Angeles",
    address: "316 S Lilly St, Moscow, ID 83843, USA",
    placeId: "ChIJk1NnZn8noFQRAgtqmQQocoA",
    geo: {
      latitude: 46.7318413,
      longitude: -117.0064047,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ID/islamic-center-of-moscow-moscow",
  ids,
};
