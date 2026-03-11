import { createMohidWidgetRun } from "../../../mohid";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d6abef87-f2f3-4f90-8daa-74e2c7ba6172",
    name: "Al-Amaan Center",
    url: "https://www.alamaan.org/",
    timeZoneId: "America/Chicago",
    address: "5620 Smetana Dr, Minnetonka, MN 55343, USA",
    placeId: "ChIJ2yoQ9-Ih9ocRQBeJrTD1hns",
    geo: {
      latitude: 44.900831,
      longitude: -93.4049311,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MN/al-amaan-center-minnetonka",
  ids,
  run: createMohidWidgetRun(ids, "https://us.mohid.co/mn/minneapolis/alamaan"),
};
