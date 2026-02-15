import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "30aa587b-d55d-4d2a-9a79-17366e1bb763",
    name: "Islamic Institute of Knowledge",
    url: "https://www.facebook.com/IslamicInstituteofKnowledge/",
    timeZoneId: "America/Detroit",
    address: "6345 Schaefer Rd, Dearborn, MI 48126, USA",
    placeId: "ChIJKXjS-ro0O4gRwTgPcmOVvoo",
    geo: {
      latitude: 42.3364429,
      longitude: -83.1776415,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/islamic-institute-of-knowledge-dearborn",
  ids,
};
