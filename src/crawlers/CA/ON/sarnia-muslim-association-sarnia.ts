// @ts-nocheck
import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids = [
  {
    uuid4: "95dc0e87-c5d0-4184-9cdd-bf46d7178cad",
    name: "Sarnia Muslim Association",
    url: "http://sarniamuslim.com/",
    timeZoneId: "America/Toronto",
    address: "1609 London Line, Sarnia, ON N7W 1A9, Canada",
    placeId: "ChIJh0ojepCDJYgRsTMgfVncHE4",
    geo: {
      latitude: 42.9831935,
      longitude: -82.33556689999999,
    },
  },
];
const run = async () => {
  const $ = await util.load(ids[0].url);

  const a = util.mapToText($, "figure tr:last-child td").filter(util.matchTime);
  if (a.length === 6) {
    // No juma2 - fill in with placeholder
    a[6] = "-";
    a[7] = "-";
  }

  util.setTimes(ids[0], a);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "CA/ON/sarnia-muslim-association-sarnia",
  ids,
  run,
};
