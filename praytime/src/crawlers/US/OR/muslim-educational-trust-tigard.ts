// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "c3f59c5d-0937-4396-84bd-b3de750105fd",
    name: "Muslim Educational Trust",
    url: "http://www.metpdx.org/",
    timeZoneId: "America/Los_Angeles",
    address: "10330 SW Scholls Ferry Rd, Tigard, OR 97223, USA",
    placeId: "ChIJo671KAENlVQRp8t91b526ww",
    geo: {
      latitude: 45.444906,
      longitude: -122.7952085,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OR/muslim-educational-trust-tigard",
  ids,
};
