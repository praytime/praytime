import { createMasjidAppRun } from "../../../masjidapp";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c289251e-79b5-429d-b79a-60e86d6083a3",
    name: "The Muslim Unity Center",
    url: "http://www.muslimunitycenter.org/",
    timeZoneId: "America/Detroit",
    address: "1830 W Square Lake Rd, Bloomfield Twp, MI 48302, USA",
    placeId: "ChIJc3ClsLi-JIgRLNB0Yvt39-0",
    geo: {
      latitude: 42.60524969999999,
      longitude: -83.3157209,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/the-muslim-unity-center-bloomfield-twp",
  ids,
  run: createMasjidAppRun(ids, {
    prayerUrl: "https://themasjidapp.net/masjids/muc/prayers",
    requireJuma: true,
  }),
};
