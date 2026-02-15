import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "7a4069a7-1f20-4570-9f72-ab311dbf0684",
    name: "ICC - Islamic Center of Coppell",
    url: "https://iccmasjid.org/",
    timeZoneId: "America/Chicago",
    address: "612 E Sandy Lake Rd #100, Coppell, TX 75019, USA",
    placeId: "ChIJC9xVGTIpTIYRbXMwcm2PEGk",
    geo: {
      latitude: 32.9699245,
      longitude: -96.9762399,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://us.mohid.co/tx/dallas/iccltx/masjid/widget/api/index/?m=prayertimings",
  );

  const a = util.mapToText($, ".prayer_iqama_div").slice(1);
  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/icc-islamic-center-of-coppell-coppell",
  ids,
  run,
};
