// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "83d4489d-10af-42b1-863e-e881c320417e",
    name: "Islamic Center of Kitsap County",
    url: "https://www.facebook.com/BremertonMosque/",
    timeZoneId: "America/Los_Angeles",
    address: "1140 Marine Dr, Bremerton, WA 98312, USA",
    placeId: "ChIJ90zWsRU3kFQRsKDV9I2m7hw",
    geo: {
      latitude: 47.57203199999999,
      longitude: -122.6645053,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/WA/islamic-center-of-kitsap-county-bremerton",
  ids,
};
