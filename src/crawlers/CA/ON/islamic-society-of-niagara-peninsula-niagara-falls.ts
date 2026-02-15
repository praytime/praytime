import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f692109a-fa71-4446-bb5b-cc6ab26437ae",
    name: "Islamic Society of Niagara Peninsula",
    url: "http://isnp.ca/",
    timeZoneId: "America/Toronto",
    address: "6768 Lyons Creek Rd, Niagara Falls, ON L2E 6S6, Canada",
    placeId: "ChIJhyOJylNB04kRQK0-Tp58Df8",
    geo: {
      latitude: 43.03263760000001,
      longitude: -79.1067344,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/ON/islamic-society-of-niagara-peninsula-niagara-falls",
  ids,
};
