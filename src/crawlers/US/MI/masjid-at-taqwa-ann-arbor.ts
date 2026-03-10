import { createMasjidalRun } from "../../../masjidal";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "d5efbd90-a918-481d-982e-90379f5975e6",
    name: "Masjid At-Taqwa",
    url: "https://masjidattaqwa.org/",
    timeZoneId: "America/Detroit",
    address: "2680 Golfside Rd, Ann Arbor, MI 48108, USA",
    placeId: "ChIJXbuZp9yoPIgRVOMrNTmT_N8",
    geo: {
      latitude: 42.24916,
      longitude: -83.661371,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/MI/masjid-at-taqwa-ann-arbor",
  ids,
  run: createMasjidalRun(ids, "xdy0XnAX", { jumaMode: "setJumaTimes" }),
};
