import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "08c3694e-ddd3-4ce0-8d5a-e717bdd26459",
    name: "Islamic Center of Fremont (ICF-Irvington)",
    url: "https://www.icfbayarea.com/",
    timeZoneId: "America/Los_Angeles",
    address: "4039 Irvington Ave, Fremont, CA 94538, USA",
    placeId: "ChIJfSMabs3Aj4ARPQ0oQC1SR90",
    geo: {
      latitude: 37.531369,
      longitude: -121.9598144,
    },
  },
  {
    uuid4: "ecd95438-c0d2-432e-b59d-1d465311951b",
    name: "Masjid Zakariya (ICF-Albrae)",
    url: "https://www.icfbayarea.com/",
    timeZoneId: "America/Los_Angeles",
    address: "42412-42472, Albrae St, Fremont, CA 94538, USA",
    placeId: "ChIJo0PT9UDHj4ARyny6z88R09g",
    geo: {
      latitude: 37.50924699999999,
      longitude: -121.9723563,
    },
  },
];
const run = async () => {
  const $ = await util.load(
    "https://ummahsoft.org/salahtime/masjid-embed/widget_prayer.php?masjid_id=3443&masjid_id2=50059",
  );

  util.setTimes(ids[0], util.mapToText($, ".prayer-timing td.col-3").slice(1));
  util.setTimes(ids[1], util.mapToText($, ".prayer-timing td.col-4").slice(1));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/CA/islamic-center-of-fremont-fremont",
  ids,
  run,
};
