// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "4341d93e-69d7-4f2e-b349-271cfca4c5fc",
    name: "Mankato Islamic Center",
    url: "http://mankatoislamiccenter.com/",
    timeZoneId: "America/Chicago",
    address: "329 N Broad St, Mankato, MN 56001, USA",
    placeId: "ChIJ9di4APA59IcRekLbxz42zk8",
    geo: {
      latitude: 44.1686438,
      longitude: -93.99725180000002,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/mankato-islamic-center-mankato",
  ids,
};
