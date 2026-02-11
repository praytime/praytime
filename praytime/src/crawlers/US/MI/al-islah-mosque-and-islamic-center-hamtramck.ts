// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "55261a3c-2864-49c4-923f-9cc5cfa0d15f",
    name: "Al-Islah Mosque & Islamic Center",
    url: "http://al-islah.us/",
    timeZoneId: "America/Detroit",
    address: "2733 Caniff St, Hamtramck, MI 48212, USA",
    placeId: "ChIJRXGPLGvSJIgRthmNdSS6PBk",
    geo: {
      latitude: 42.3996997,
      longitude: -83.0606317,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/al-islah-mosque-and-islamic-center-hamtramck",
  ids,
};
