import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "e80ed248-3e1f-483b-b7cc-6acfc47f9926",
    name: "Utica Masjid (Muslim Community Association of Mohawk Valley)",
    url: "https://us.mohid.co/ny/syracuse/mcamv",
    timeZoneId: "America/New_York",
    address: "1631 Kemble St, Utica, NY 13501, USA",
    placeId: "ChIJ9QziVYhH2YkRnPo3_F-fYgA",
    geo: {
      latitude: 43.0869773,
      longitude: -75.2471541,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://us.mohid.co/ny/syracuse/mcamv/masjid/widget/api/index/?m=prayertimings",
  );

  const a = util.mapToText($, "#daily .prayer_iqama_div");
  a.splice(0, 1); // remove header
  const j = util
    .mapToText($, '#jummah li:contains("Khutba")')
    .map(util.extractTimeAmPm);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/utica-masjid-muslim-community-association-of-mohawk-valley-utica",
  ids,
  run,
};
