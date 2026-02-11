// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "9bdd5b20-2070-4120-a67b-7e86c9a433c5",
    name: "Islamic Center of Federal Way",
    url: "http://islamiccenterfederalway.com/",
    timeZoneId: "America/Los_Angeles",
    address: "3304 S 272nd St, Kent, WA 98032, USA",
    placeId: "ChIJAfiGXY9ZkFQRM5ct6IbGN-U",
    geo: {
      latitude: 47.3582213,
      longitude: -122.289966,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-federal-way-kent",
  ids,
};
