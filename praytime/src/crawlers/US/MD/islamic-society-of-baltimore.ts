// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "6f150f06-267b-41e2-bf9a-4ac4994c42aa",
    name: "Islamic Society of Baltimore",
    url: "https://isb.org/",
    address: "6631 Johnnycake Rd, Windsor Mill, MD 21244, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJSxyR1rIeyIkRMzYEmtZyAec",
    geo: {
      latitude: 39.303512,
      longitude: -76.747874,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://us.mohid.co/md/mdrgn/isb/masjid/widget/api/index/?m=prayertimings",
  );

  const a = util.mapToText($, ".prayer_iqama_div");
  a.splice(0, 1); // remove header
  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/MD/islamic-society-of-baltimore",
  ids,
  run,
};
