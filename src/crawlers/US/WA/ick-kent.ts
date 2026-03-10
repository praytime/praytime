import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3c9ad4a0-1eec-43ec-ad55-c92531c5acf5",
    name: "Islamic Center of Kent",
    url: "http://islamiccenterofkent.org",
    timeZoneId: "America/Los_Angeles",
    address: "20857 108th Ave SE, Kent, WA 98031, USA",
    geo: {
      latitude: 47.414238,
      longitude: -122.198083,
    },
    placeId: "ChIJa9oRvTVckFQRXhoz138Dq08",
  },
];
export const crawler: CrawlerModule = {
  name: "US/WA/ick-kent",
  ids,
  run: createMasjidalRun(ids, "QL0MGBAZ"),
};
