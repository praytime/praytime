// @ts-nocheck
import type { CrawlerModule } from "../../../types";

// TODO: page structure difficult to scrape

const ids = [
  {
    uuid4: "38d2adcf-8192-4a2d-bdb8-ec02b5995842",
    name: "Muslim Center of Greater Princeton",
    url: "https://www.themuslimcenter.org/",
    timeZoneId: "America/New_York",
    address: "2030 Old Trenton Rd, West Windsor Township, NJ 08550, USA",
    placeId: "ChIJlTc5fTXew4kRMUNIB8nW8qQ",
    geo: {
      latitude: 40.2825206,
      longitude: -74.569464,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NJ/muslim-center-of-greater-princeton-west-windsor-township",
  ids,
};
