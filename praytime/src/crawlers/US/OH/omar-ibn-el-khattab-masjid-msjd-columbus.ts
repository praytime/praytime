// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "f0d9ece2-c409-49b7-b825-7dc740e22c24",
    name: "Omar Ibn El-Khattab Masjid مسجد",
    url: "https://www.masjidomarohio.org/",
    timeZoneId: "America/New_York",
    address: "580 Riverview Dr, Columbus, OH 43202, USA",
    placeId: "ChIJkbXh5S6MOIgR1gaXANxIht8",
    geo: {
      latitude: 40.024457,
      longitude: -83.028763,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/OH/omar-ibn-el-khattab-masjid-msjd-columbus",
  ids,
};
