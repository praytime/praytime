import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "3d4df36b-9532-44a1-be32-2cfd4fb08010",
    name: "New Brunswick Islamic Center",
    url: "https://www.nbic.org/",
    address: "1330 Livingston Ave, North Brunswick Township, NJ 08902, USA",
    placeId: "ChIJaz5NthjEw4kR8CNP7bVa7II",
    timeZoneId: "America/New_York",
    geo: {
      latitude: 40.461986,
      longitude: -74.477192,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, ".prayertimes td").map(util.extractTime);
  a[3] = "-";

  const j = util
    .mapToText($, '.sqs-block-content :contains("Juma Prayer")')
    .flatMap(util.matchTimeG);

  util.setIqamaTimes(ids[0], a);
  util.setJumaTimes(ids[0], j);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/NJ/new-brunswick-islamic-center-new-jersey",
  ids,
  run,
};
