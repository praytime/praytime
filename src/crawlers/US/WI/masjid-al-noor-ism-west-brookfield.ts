import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const MASJIDAL_ID = "nzKzJoKO";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "13211926-3e33-4516-b22e-23ecafffad46",
    name: "Masjid Al Noor, ISM West",
    url: "https://www.ismonline.org/ism-brookfield",
    timeZoneId: "America/Chicago",
    address: "16670 Pheasant Dr, Brookfield, WI 53005, USA",
    placeId: "ChIJ8d4ATMMGBYgR-wMaKrJER0w",
    geo: {
      latitude: 43.06634710000001,
      longitude: -88.1199051,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/WI/masjid-al-noor-ism-west-brookfield",
  ids,
  run: createMasjidalRun(ids, MASJIDAL_ID),
};
