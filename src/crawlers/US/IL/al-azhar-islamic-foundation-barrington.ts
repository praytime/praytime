import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "61478491-eb16-4345-af04-6377673a09a9",
    name: "Al-Azhar Islamic Foundation",
    url: "http://www.aifcenter.org/",
    timeZoneId: "America/Chicago",
    address: "160 Hawthorne Rd, Barrington, IL 60010, USA",
    placeId: "ChIJBYNsBt8JD4gRep-nSYdDYms",
    geo: {
      latitude: 42.1203328,
      longitude: -88.16981779999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IL/al-azhar-islamic-foundation-barrington",
  ids,
};
