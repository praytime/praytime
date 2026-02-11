// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "9127ef11-1a54-4c78-b161-acbf2c08edd9",
    name: "Islamic Community of Bosniaks in Washington",
    url: "https://www.facebook.com/icbwseattle/",
    timeZoneId: "America/Los_Angeles",
    address: "20001 25th Ave NE, Shoreline, WA 98155, USA",
    placeId: "ChIJ2Q0Ypz8QkFQR4yihYPpYgDE",
    geo: {
      latitude: 47.77398470000001,
      longitude: -122.3038136,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-community-of-bosniaks-in-washington-shoreline",
  ids,
};
