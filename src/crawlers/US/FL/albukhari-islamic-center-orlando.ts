// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "bc802f2c-d2cf-491e-86bf-556e8c497ad3",
    name: "Albukhari Islamic Center",
    url: "http://www.albukhari.org/",
    timeZoneId: "America/New_York",
    address: "8009 S Orange Ave, Orlando, FL 32809, USA",
    placeId: "ChIJ9fjeDud854gRPdUGD_IA1aI",
    geo: {
      latitude: 28.4535715,
      longitude: -81.3638177,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/albukhari-islamic-center-orlando",
  ids,
};
