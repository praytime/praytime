import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0fe7e822-0da1-4496-b7a5-c7d2688449de",
    name: "Jami Masjid/Buffalo Nomads",
    url: "https://www.jamimasjidbuffalo.org/",
    timeZoneId: "America/New_York",
    address: "1955 Genesee St, Buffalo, NY 14211, USA",
    placeId: "ChIJ8fG1exYN04kRPTDABz_cb_U",
    geo: {
      latitude: 42.91392979999999,
      longitude: -78.8094668,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".image-subtitle-wrapper p");

  // juma comes after dhuhr
  const j = (a[2] ?? "").match(/\d+\s*:\s*\d+\s*\w+/g);
  util.setJumaTimes(ids[0], j);

  a.splice(2, 1); // remove juma
  util.setIqamaTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NY/jami-masjid-buffalo-nomads-buffalo",
  ids,
  run,
};
