// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "b0051f0e-0e5e-480f-a40a-2753ea7d19a2",
    name: "Islamic Center of Maine",
    url: "https://www.islamiccenterofmaine.org/",
    timeZoneId: "America/New_York",
    address: "151 Park St, Orono, ME 04473, USA",
    placeId: "ChIJUa2_Njyxr0wRYyXLtR_zLEo",
    geo: {
      latitude: 44.89432149999999,
      longitude: -68.6583157,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/ME/islamic-center-of-maine-orono",
  ids,
};
