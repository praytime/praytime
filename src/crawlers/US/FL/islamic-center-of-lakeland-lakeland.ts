// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "56fd9fe0-5dcf-49c6-a4b2-d9c9b24ba8aa",
    name: "Islamic Center of Lakeland",
    url: "https://www.facebook.com/Islamic-Center-of-Lakeland-279405818771151/",
    timeZoneId: "America/New_York",
    address: "1161 Blossom Cir S, Lakeland, FL 33805, USA",
    placeId: "ChIJxcm5vF9H3YgRIQSMhTmnKCo",
    geo: {
      latitude: 28.066452,
      longitude: -81.97322079999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-lakeland-lakeland",
  ids,
};
