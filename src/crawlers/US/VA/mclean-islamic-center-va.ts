import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "aaebd1a9-8a8d-401a-aab9-77e3b32e5ce7",
    name: "McLean Islamic Center",
    url: "http://mcleanmuslims.org/",
    address: "8800 Jarrett Valley Dr, Vienna, VA 22182, USA",
    timeZoneId: "America/New_York",
    placeId: "ChIJCQzQpF61t4kRYD9H56t-xBw",
    geo: {
      latitude: 38.93558,
      longitude: -77.248851,
    },
  },
];
const run = async () => {
  const prayerTimes = await util.loadMasjidAppPrayerTimes(
    "https://themasjidapp.net/masjids/mic/prayers",
    ids[0],
  );

  util.setIqamaTimes(ids[0], [
    prayerTimes.fajr,
    prayerTimes.zuhr,
    prayerTimes.asr,
    prayerTimes.maghrib,
    prayerTimes.isha,
  ]);
  util.setJumaTimes(ids[0], prayerTimes.juma.slice(0, 3));

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/VA/mclean-islamic-center-va",
  ids,
  run,
};
