import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

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
const run = async () => {
  const iqama = await util.loadMasjidalIqama("QL0MGBAZ");
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
  name: "US/WA/ick-kent",
  ids,
  run,
};
