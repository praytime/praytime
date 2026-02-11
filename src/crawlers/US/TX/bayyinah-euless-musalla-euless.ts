// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "a89d08a7-b04f-4cce-80a5-f050d9641ba1",
    name: "Bayyinah Euless Musalla",
    url: "https://bayyinah.com/",
    timeZoneId: "America/Chicago",
    address: "1701 W Euless Blvd, Euless, TX 76040, USA",
    placeId: "ChIJR6QZxTZ-ToYR9RM2uDEQLCQ",
    geo: {
      latitude: 32.82445930000001,
      longitude: -97.1098293,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/TX/bayyinah-euless-musalla-euless",
  ids,
};
