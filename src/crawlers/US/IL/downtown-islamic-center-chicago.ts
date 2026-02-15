import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "ea296a5e-ba5c-40b0-9a8a-6ac6bf42c857",
    name: "Downtown Islamic Center",
    url: "https://www.dic-chicago.org",
    timeZoneId: "America/Chicago",
    address: "231 S State St #4, Chicago, IL 60604, USA",
    geo: {
      latitude: 41.878692,
      longitude: -87.627349,
    },
    placeId: "ChIJfdGgl6MsDogR6i2cBNvfzf8",
    fajrIqama: "check website",
    zuhrIqama: "check website",
    asrIqama: "check website",
    maghribIqama: "check website",
    ishaIqama: "check website",
    juma1: "check website",
    juma2: "check website",
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/downtown-islamic-center-chicago",
  ids,
};
