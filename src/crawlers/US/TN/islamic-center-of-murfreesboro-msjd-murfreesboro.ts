import { createMadinaAppsRun } from "../../../madinaapps";
import type { CrawlerModule } from "../../../types";

const MADINAAPPS_CLIENT_ID = "46";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3018b643-7bad-4f51-9e9e-5732fc917460",
    name: "Islamic Center of Murfreesboro مسجد",
    url: "http://icmtn.org/",
    timeZoneId: "America/Chicago",
    address: "2605 Veals Rd, Murfreesboro, TN 37127, USA",
    placeId: "ChIJKW-V5iv5Y4gRdqidxwFUPJY",
    geo: {
      latitude: 35.813789,
      longitude: -86.349572,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/TN/islamic-center-of-murfreesboro-msjd-murfreesboro",
  ids,
  run: createMadinaAppsRun(ids, MADINAAPPS_CLIENT_ID),
};
