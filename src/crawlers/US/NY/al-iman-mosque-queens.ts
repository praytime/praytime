import { loadMawaqitMobileTimesFromUrl } from "../../../mawaqit";
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const MAWAQIT_FALLBACK_URL =
  "https://mawaqit.net/en/m/islamic-center-brooklyn?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0&view=mobile";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aeec7d94-658a-47cb-b38c-8254da8bd7b2",
    name: "Al-Iman Mosque",
    url: "https://alimancenter.org/",
    timeZoneId: "America/New_York",
    address: "24-30 Steinway St, Queens, NY 11103, USA",
    placeId: "ChIJcd40bWpfwokRarqRDvYtYAM",
    geo: {
      latitude: 40.768471,
      longitude: -73.9115833,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);
  const mawaqitUrl =
    $("iframe[src*='mawaqit.net'][src*='/m/']").first().attr("src") ??
    MAWAQIT_FALLBACK_URL;
  await loadMawaqitMobileTimesFromUrl(ids[0], mawaqitUrl);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/al-iman-mosque-queens",
  ids,
  run,
};
