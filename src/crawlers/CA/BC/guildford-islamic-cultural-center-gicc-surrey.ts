import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "0745c2e6-9490-4ae1-9522-1082c63a0496",
    name: "Guildford Islamic Cultural Center (GICC)",
    url: "https://giccmasjid.org/",
    timeZoneId: "America/Vancouver",
    address: "15290 103 A Ave #101, Surrey, BC V3R 7P8, Canada",
    placeId: "ChIJs0qRRRHXhVQRFThmClsZJeY",
    geo: {
      latitude: 49.19003500000001,
      longitude: -122.7981364,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error(
      "No masjid record configured for Guildford Islamic Cultural Center (GICC)",
    );
  }

  await util.setAwqatIqamaTimes(masjid, "96ac3382-aef7-4710-a187-7002ba7f4323");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/guildford-islamic-cultural-center-gicc-surrey",
  ids,
  run,
};
