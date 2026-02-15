import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "a5d9ddbe-664f-4064-80c3-3cb07f7335b7",
    name: "Masjid Ibrahim",
    url: "http://www.isdonline.org/",
    timeZoneId: "America/New_York",
    address: "28 Salem Church Rd #2934, Newark, DE 19713, USA",
    placeId: "ChIJ_T8wFroAx4kRrT4wHeUO1rk",
    geo: {
      latitude: 39.6759083,
      longitude: -75.69621839999999,
    },
  },
];
const run = async () => {
  const [d] = await util.loadJson(
    util.strftime(
      "https://isdonline.org/home/get_Payer_Time?month=%m&date=%d",
      ids[0],
    ),
  );
  // [
  //   {
  //     "FajarBegin": "5:44 AM",
  //     "FajarAdhan": "05:45 AM",
  //     "Fajar": "6:00 AM",
  //     "ZuharBegin": "11:52 AM",
  //     "ZuharAdhan": "12:00 PM",
  //     "Zuhar": "12:15 PM",
  //     "AsrBegin": "2:21 PM",
  //     "AsrAdhan": "02:30 PM",
  //     "Asr": "2:45 PM",
  //     "MaghribBegin": "4:40 PM",
  //     "MaghribAdhan": "04:40 PM",
  //     "Maghrib": "4:40 PM",
  //     "IshaBegin": "5:59 PM",
  //     "IshaAdhan": "06:45 PM",
  //     "Isha": "7:00 PM",
  //     "Jumma1Begin": "",
  //     "Jumma1Adhan": "12:00 PM",
  //     "Jumma1": "12:30 PM",
  //     "Jumma2Begin": "",
  //     "Jumma2Adhan": "01:10 PM",
  //     "Jumma2": "1:40 PM",
  //     "Jumma3Begin": "undefined",
  //     "Jumma3Adhan": "12:00 AM",
  //     "Jumma3": "undefined",
  //     "HijriOffset": "-1"
  //   }
  // ]
  util.setTimes(ids[0], [
    d.Fajar,
    d.Zuhar,
    d.Asr,
    d.Maghrib,
    d.Isha,
    d.Jumma1 === "undefined" ? null : d.Jumma1Adhan,
    d.Jumma2 === "undefined" ? null : d.Jumma2Adhan,
    d.Jumma3 === "undefined" ? null : d.Jumma3Adhan,
  ]);

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/DE/islamic-society-of-delaware",
  ids,
  run,
};
