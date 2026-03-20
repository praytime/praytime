import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e7dfd58c-f533-4b7d-bf7f-bf2f89f89215",
    name: "Muslim American Society MAS Iowa",
    url: "http://www.masiowa.org/",
    timeZoneId: "America/Chicago",
    address: "2121 N Towne Ln NE # B, Cedar Rapids, IA 52402, USA",
    placeId: "ChIJR91QaHnw5IcRSlakz_1krP0",
    geo: {
      latitude: 42.03277509999999,
      longitude: -91.6719389,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IA/muslim-american-society-mas-iowa-cedar-rapids",
  ids,
};
