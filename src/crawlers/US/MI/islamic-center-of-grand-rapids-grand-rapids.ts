import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "230fcafc-a136-4996-85f7-b27408d6e138",
    name: "Islamic Center of Grand Rapids",
    url: "http://www.islamiccentergr.org/",
    timeZoneId: "America/Detroit",
    address: "1301 Burton St SE, Grand Rapids, MI 49507, USA",
    placeId: "ChIJrRw4m4WyGYgRKCll_KirkfA",
    geo: {
      latitude: 42.9274421,
      longitude: -85.6361883,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-center-of-grand-rapids-grand-rapids",
  ids,
};
