import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "429a18d3-7d29-4dcc-beb5-3c98628a5fea",
    name: "Masjid Al-Iman",
    url: "http://www.awqat.net/Masjids/BCAlIman/aliman.html",
    timeZoneId: "America/Vancouver",
    address: "6125 Sussex Ave, Burnaby, BC V5H 4G1, Canada",
    placeId: "ChIJL1L7Vlh2hlQRc_MW7kzdp-8",
    geo: {
      latitude: 49.2289475,
      longitude: -122.9990167,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Masjid Al-Iman");
  }

  await util.setAwqatIqamaTimes(masjid, "979b2ff1-f133-443a-a808-e05ad4273a14");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-al-iman-burnaby",
  ids,
  run,
};
