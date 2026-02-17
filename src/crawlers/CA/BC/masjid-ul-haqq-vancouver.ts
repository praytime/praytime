import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9b52504b-75be-4e9c-9275-adc1d4757217",
    name: "Masjid Ul-Haqq",
    url: "http://org.thebcma.com/vancouver/",
    timeZoneId: "America/Vancouver",
    address: "4162 Welwyn St, Vancouver, BC V5N 3Z2, Canada",
    placeId: "ChIJP9HvUql2hlQRc1E22SNR5wA",
    geo: {
      latitude: 49.2479376,
      longitude: -123.06975,
    },
  },
];
const run = async () => {
  const masjid = ids[0];
  if (!masjid) {
    throw new Error("No masjid record configured for Masjid Ul-Haqq");
  }

  await util.setAwqatIqamaTimes(masjid, "8fe9f823-98ff-4304-a312-337d34e3620a");
  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/BC/masjid-ul-haqq-vancouver",
  ids,
  run,
};
