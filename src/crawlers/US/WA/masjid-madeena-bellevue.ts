import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/wa/bellevue/mmblv/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0b614d35-724a-4483-bad5-5f20444dd069",
    name: "Masjid Madeena",
    url: "https://masjidmadeena.org/",
    timeZoneId: "America/Los_Angeles",
    address: "15935 NE 8th St Suite B100, Bellevue, WA 98008, USA",
    geo: {
      latitude: 47.616337,
      longitude: -122.127469,
    },
    placeId: "ChIJL-zpaLdtkFQRECFsuDUHy6o",
  },
];
const run = async () => {
  const $ = await util.load(PRAYER_WIDGET_URL);

  const iqamaTimes = util
    .mapToText($, "#daily .prayer_iqama_div")
    .slice(1)
    .map(util.extractTimeAmPm)
    .filter((time) => time.length > 0);
  if (iqamaTimes.length < 5) {
    throw new Error("failed to parse mohid iqama timings");
  }
  util.setIqamaTimes(ids[0], iqamaTimes.slice(0, 5));

  const jumaTimes = util
    .mapToText($, "#jummah li")
    .map(util.extractTimeAmPm)
    .filter((time) => time.length > 0);
  if (jumaTimes.length === 0) {
    throw new Error("failed to parse mohid juma timings");
  }
  util.setJumaTimes(ids[0], jumaTimes.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/WA/masjid-madeena-bellevue",
  ids,
  run,
};
