// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "0f79c930-5141-4bb6-b820-25a9028c18b6",
    name: "Faizan-e-Madina Islamic Centre Surrey (Dawat-e-Islami Canada)",
    url: "http://www.dawateislamicanada.net/",
    timeZoneId: "America/Vancouver",
    address: "7062 134 St, Surrey, BC V3W 4T2, Canada",
    placeId: "ChIJYdzrxtLbhVQRctJuc0fa3Gk",
    geo: {
      latitude: 49.130985,
      longitude: -122.850896,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "CA/BC/faizan-e-madina-islamic-centre-surrey-dawat-e-islami-canada-surrey",
  ids,
};
