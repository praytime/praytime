import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "dfab4495-7f4a-4cf7-998f-d7056fff7e97",
    name: "McKinney Islamic Association",
    url: "http://www.mckinneymasjid.org/",
    address: "2940 Eldorado Pkwy, McKinney, TX 75070, USA",
    geo: {
      latitude: 33.169004,
      longitude: -96.66308,
    },
    placeId: "ChIJeYmpKVURTIYRKFS4Iqx0hfY",
    timeZoneId: "America/Chicago",
  },
];
const run = async () => {
  const prayerTimes = await util.loadMasjidalIqama("wLVzDqLJ");
  util.setIqamaTimes(ids[0], [
    prayerTimes.fajr,
    prayerTimes.zuhr,
    prayerTimes.asr,
    prayerTimes.maghrib,
    prayerTimes.isha,
  ]);
  util.setJumaTimes(
    ids[0],
    [prayerTimes.jummah1, prayerTimes.jummah2, prayerTimes.jummah3].filter(
      (value): value is string => Boolean(value),
    ),
  );

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/TX/mckinney-islamic-association",
  ids,
  run,
};
