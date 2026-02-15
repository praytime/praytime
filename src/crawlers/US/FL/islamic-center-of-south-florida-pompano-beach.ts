import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dd610d60-eb2f-430d-aa82-b96984ef2daf",
    name: "Islamic Center of South Florida",
    url: "http://www.icosf.org/",
    timeZoneId: "America/New_York",
    address: "1641 NW 15th St, Pompano Beach, FL 33069, USA",
    placeId: "ChIJa3FJxxgubRQR15V3F0qIvFE",
    geo: {
      latitude: 26.2463828,
      longitude: -80.1460441,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/islamic-center-of-south-florida-pompano-beach",
  ids,
};
