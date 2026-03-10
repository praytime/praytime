import { createMasjidBoxRun } from "../../../masjidbox";
import type { CrawlerModule } from "../../../types";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "c5a31beb-5590-42d3-97a4-7f8e354298f1",
    name: "Noor Islamic Cultural Center",
    url: "http://www.noorohio.org/",
    timeZoneId: "America/New_York",
    address: "5001 Wilcox Rd, Dublin, OH 43016, USA",
    placeId: "ChIJQxB5dJ6TOIgROGllm3fednM",
    geo: {
      latitude: 40.0654944,
      longitude: -83.1493139,
    },
  },
];
export const crawler: CrawlerModule = {
  name: "US/OH/noor-islamic-cultural-center-dublin",
  ids,
  run: createMasjidBoxRun(ids, "https://masjidbox.com/prayer-times/noorohio"),
};
