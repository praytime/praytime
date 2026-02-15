import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "8a4ff4b6-9c4b-4dde-9014-d87ba4fdf9e0",
    name: "Islamic Center of Contra Costa",
    url: "https://icofcc.org/",
    address: "2836 Clayton Rd, Concord, CA 94519, USA",
    placeId: "ChIJSd0flTFnhYARBaaGsqAIGVM",
    timeZoneId: "America/Los_Angeles",
    geo: {
      latitude: 37.974394,
      longitude: -122.025492,
    },
  },
];
// TODO crawler

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-contra-costa",
  ids,
};
