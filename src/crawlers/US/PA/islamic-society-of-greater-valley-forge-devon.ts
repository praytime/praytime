import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "f3dcfd95-9670-44a8-bc9b-7cb763e2994c",
    name: "Islamic Society of Greater Valley Forge",
    url: "http://www.isgvf.com/",
    timeZoneId: "America/New_York",
    address: "958 N Valley Forge Rd, Devon, PA 19333, USA",
    placeId: "ChIJm91vh4KUxokRBbPywjhcF-k",
    geo: {
      latitude: 40.066958,
      longitude: -75.433962,
    },
  },
];
const run = async () => {
  const dateStr = util.strftime("%d%b%Y", ids[0]).toUpperCase();
  const [d] = await util.loadJson<
    Array<{
      prayer_time: string;
      friday_time: string;
    }>
  >("https://app.flashgood.org/api/v1/prayertime.php?id=27");

  if (!d) {
    throw new Error("missing prayer data");
  }

  type PrayerTime = {
    date: string;
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };

  type FridayTime = {
    time: {
      hour: number;
      minute: number;
      second: number;
    };
  };

  const parsedPrayerData = JSON.parse(d.prayer_time);
  const prayerList = parsedPrayerData.prayerTimes as Array<
    PrayerTime & { date: string }
  >;
  const p = prayerList.find(({ date }) => date === dateStr);
  if (!p) {
    throw new Error(`missing prayer entry for ${dateStr}`);
  }

  util.setIqamaTimes(ids[0], [p.fajr, p.dhuhr, p.asr, p.maghrib, p.isha]);

  const parsedFridayTimes = JSON.parse(d.friday_time) as FridayTime[];
  util.setJumaTimes(
    ids[0],
    parsedFridayTimes.map(({ time }) => `${time.hour}:${time.minute}`),
  );

  // d.prayer_time.prayer_time = [
  // ...
  //   {
  //     "date": "01DEC2021",
  //     "sunrise": "7:05 AM",
  //     "sunset": "4:37 PM",
  //     "prayerTime": {
  //       "fajr": "6:15 AM",
  //       "dhuhr": "12:30 PM",
  //       "asr": "2:30 PM",
  //       "maghrib": "4:42 PM",
  //       "isha": "7:30 PM"
  //     }
  //   },
  //   ...
  // ]

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/PA/islamic-society-of-greater-valley-forge-devon",
  ids,
  run,
};
