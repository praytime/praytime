import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "59b3b8f1-146e-48d5-b426-2a87b7884df1",
    name: "ICC Behar",
    url: "https://www.facebook.com/iccbehargr",
    timeZoneId: "America/Detroit",
    address: "3425 E Paris Ave SE, Grand Rapids, MI 49512, USA",
    placeId: "ChIJF7pnigRNGIgRdEgMSAsVotM",
    geo: {
      latitude: 42.900865,
      longitude: -85.56841399999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/icc-behar-grand-rapids",
  ids,
};
