import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "1237a87b-dc8e-4b82-9d33-90567bae7e25",
    name: "Masjid Abubakar Siddiq",
    url: "http://www.rochestermosque.org/",
    timeZoneId: "America/Chicago",
    address: "17 N Broadway Ave, Rochester, MN 55906, USA",
    placeId: "ChIJoRVt-Xxf94cRHjbG4QaEr2w",
    geo: {
      latitude: 44.0241286,
      longitude: -92.463476,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/masjid-abubakar-siddiq-rochester",
  ids,
};
