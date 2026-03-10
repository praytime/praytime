import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "af9fbb37-2ba5-4331-b5ca-e3f19c78fe59",
    name: "Islamic Center of Johnson County (ICJC)",
    url: "https://icjc.org/",
    timeZoneId: "America/Chicago",
    address: "9005 W 151st St, Overland Park, KS 66221, USA",
    placeId: "ChIJuwdOwlXAwIcRub7ab9pFeGo",
    geo: {
      latitude: 38.8538252,
      longitude: -94.690525,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/KS/islamic-center-of-johnson-county-icjc-overland-park",
  ids,
  run: createMasjidalRun(ids, "M0dY0yA6"),
};
