import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
const run = async () => {
  const iqama = await util.loadMasjidalIqama("M0dY0yA6");

  util.setTimes(ids[0], [
    iqama.fajr,
    iqama.zuhr,
    iqama.asr,
    iqama.maghrib,
    iqama.isha,
    iqama.jummah1,
    iqama.jummah2,
    iqama.jummah3,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/KS/islamic-center-of-johnson-county-icjc-overland-park",
  ids,
  run,
};
