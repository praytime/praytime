import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "896be07a-e7bb-41ff-93db-3fb5912aaaba",
    name: "Fiji Islamic Center",
    url: "http://www.awqat.net/Masjids/BCFiji/fiji.html",
    timeZoneId: "America/Vancouver",
    address: "12988 84 Ave, Surrey, BC V3W 1B3, Canada",
    placeId: "ChIJWdoG1JvZhVQRTqWMMeahC0I",
    geo: {
      latitude: 49.1547735,
      longitude: -122.8625473,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Fiji Islamic Center");
  }

  await util.setAwqatIqamaTimes(masjid, "65059b19-8a2c-4aa2-b40b-d26696fa827c");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/fiji-islamic-center-surrey",
  ids,
  run,
};
