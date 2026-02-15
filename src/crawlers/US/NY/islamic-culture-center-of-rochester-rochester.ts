import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "5ba0eef4-ef9e-444a-921e-dc3f6efb5aa7",
    name: "Islamic Culture Center Of Rochester",
    url: "https://uama.us/en/islamic-culture-center-of-rochester/",
    timeZoneId: "America/New_York",
    address: "853 Culver Rd, Rochester, NY 14609, USA",
    placeId: "ChIJDTIXv4i11okRte3GxMvFvvY",
    geo: {
      latitude: 43.16067409999999,
      longitude: -77.56620769999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/NY/islamic-culture-center-of-rochester-rochester",
  ids,
};
