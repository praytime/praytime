// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "260e70b4-388b-48b5-9091-a86a10116bdc",
    name: "ICT Masjid Al-Qassam",
    url: "https://ictampa.org/",
    timeZoneId: "America/New_York",
    address: "5910 E 130th Ave, Tampa, FL 33617, USA",
    placeId: "ChIJWwfPC-DHwogRsTelo5Op7kE",
    geo: {
      latitude: 28.06437459999999,
      longitude: -82.39035369999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/FL/alqassam-masjid-tampa",
  ids,
};
