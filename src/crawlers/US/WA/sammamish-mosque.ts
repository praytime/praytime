import { createMuslimFeedRun } from "../../../muslimfeed";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e4dfb36d-7b2e-4ce8-8487-e544569ab459",
    name: "Sammamish Mosque",
    url: "http://www.sammamishmosque.com/",
    timeZoneId: "America/Los_Angeles",
    address: "22011 SE 20th St, Sammamish, WA 98075, USA",
    geo: {
      latitude: 47.591208,
      longitude: -122.04579,
    },
    placeId: "ChIJqYkmdyFukFQRZTbGcP7iuvg",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/sammamish-mosque",
  ids,
  run: createMuslimFeedRun(ids, "2110"),
};
