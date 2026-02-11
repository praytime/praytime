// @ts-nocheck
import type { CrawlerModule } from "../../../types";

const ids = [
  {
    uuid4: "89258d09-0330-467b-b91b-40a0e4b10271",
    name: "Baitul Ma'moor Sunni Islamic Center",
    url: "http://www.facebook.com/BaitulMamoor11635",
    timeZoneId: "America/Detroit",
    address: "11635 Conant St, Hamtramck, MI 48212, USA",
    placeId: "ChIJzaqcMjzSJIgRtFv1aYvm4tc",
    geo: {
      latitude: 42.4050986,
      longitude: -83.05480539999999,
    },
  },
];

export const crawler: CrawlerModule = {
  name: "US/MI/baitul-mamoor-sunni-islamic-center-hamtramck",
  ids,
};
