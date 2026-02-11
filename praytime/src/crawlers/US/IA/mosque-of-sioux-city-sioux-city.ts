// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "ebb94edc-9ca7-4cd2-85c9-1254f131615a",
    name: "Mosque of Sioux City",
    url: "https://www.facebook.com/MosqueOfSiouxCity",
    timeZoneId: "America/Chicago",
    address: "1219 Jones St, Sioux City, IA 51105, USA",
    placeId: "ChIJs_b9vTr9jYcRG3iPmzPkAGY",
    geo: {
      latitude: 42.50374089999999,
      longitude: -96.4011433,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/IA/mosque-of-sioux-city-sioux-city",
  ids,
};
