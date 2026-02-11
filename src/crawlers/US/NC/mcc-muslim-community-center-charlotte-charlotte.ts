// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "ab08ee23-74eb-491c-8d72-03811fc43033",
    name: "MCC - Muslim Community Center Charlotte",
    url: "http://charlottemcc.org/",
    timeZoneId: "America/New_York",
    address: "3116 Johnston Oehler Rd, Charlotte, NC 28269, USA",
    placeId: "ChIJm-jmmlQdVIgRfmMdLIMwSnQ",
    geo: {
      latitude: 35.364043,
      longitude: -80.7598536,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://ummahsoft.org/salahtime/masjid-embed/widget_prayer.php?masjid_id=51010",
  );

  const a = util.mapToText($, ".prayer-timing td:last-child");
  a.splice(0, 3); // remove first 3 elements
  a.splice(1, 1); // remove sunrise
  util.setIqamaTimes(ids[0], a);

  const j = util.mapToText($, 'td:first-child:contains("Jumu") + td');
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NC/mcc-muslim-community-center-charlotte-charlotte",
  ids,
  run,
};
