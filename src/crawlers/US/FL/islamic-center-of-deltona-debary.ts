import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "45dfbba7-ccd0-4245-bc9d-626a5c001b27",
    name: "Islamic Center of Deltona",
    url: "https://icdifl.org/",
    timeZoneId: "America/New_York",
    address: "410 Summerhaven Dr, DeBary, FL 32713, USA",
    placeId: "ChIJv4rgin4Q54gRunJFH32I1rc",
    geo: {
      latitude: 28.89910189999999,
      longitude: -81.2844649,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-deltona-debary",
  ids,
};
