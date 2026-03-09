import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const PRAYER_WIDGET_URL =
  "https://us.mohid.co/wa/bellevue/mmblv/masjid/widget/api/index/?m=prayertimings";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "39a90e54-4685-4b78-928a-a74db25e2f49",
    name: "Crossroads Musalla Mosque مسجد مصلى Musallah",
    url: "https://masjidmadeena.org/",
    timeZoneId: "America/Los_Angeles",
    address: "827 164th Ave NE, Bellevue, WA 98008, USA",
    placeId: "ChIJL-zpaLdtkFQRFoL7o_FZDZA",
    geo: {
      latitude: 47.61784129999999,
      longitude: -122.1221867,
    },
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
  name: "US/WA/crossroads-musalla-mosque-msjd-msl-musallah-bellevue",
  ids,
  run,
};
