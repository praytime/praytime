import type { CrawlerModule } from "../../../types";
import * as util from "../../../util";

const ids: CrawlerModule["ids"] = [
  {
    uuid4: "9fe30cc6-6683-46c3-808e-71646b1e124d",
    name: "Khadeeja Islamic Center (Islamic Society of Greater Salt Lake)",
    url: "http://utahmuslims.com/",
    timeZoneId: "America/Denver",
    address: "1019 W Parkway Ave, West Valley City, UT 84119, USA",
    placeId: "ChIJv-gQ9zmLUocR-VsHTtn0umU",
    geo: {
      latitude: 40.7169444,
      longitude: -111.9227778,
    },
  },
  {
    uuid4: "4e54bcd0-1bd5-47af-8df4-9d1d8f8c6003",
    name: "Masjid Al-Noor (Islamic Society of Greater Salt Lake)",
    url: "http://www.utahmuslims.com/",
    timeZoneId: "America/Denver",
    address: "740 S 700 E, Salt Lake City, UT 84102, USA",
    placeId: "ChIJrR-7dUP1UocRTHm55kiQTjU",
    geo: {
      latitude: 40.75311360000001,
      longitude: -111.8713079,
    },
  },
];

// {
//   "masjid": {
//     "id": 10067,
//     "name": "Khadeeja Islamic Center",
//     "latitude": 40.717011,
//     "longitude": -111.92272300000002,
//     "ads_disabled": false,
//     "donations_enabled": false,
//     "salah_timing": {
//       "month": 12,
//       "day": 20,
//       "fajr": "6:45am",
//       "dhuhr": "2:00pm",
//       "asr": "4:00pm",
//       "maghrib": "5:11pm",
//       "isha": "7:00pm",
//       "year": 2021,
//       "date": "2021-12-20",
//       "fajr_adhan": "6:09am",
//       "sunrise_adhan": "7:48am",
//       "dhuhr_adhan": "12:26pm",
//       "asr_adhan": "3:22pm",
//       "maghrib_adhan": "5:03pm",
//       "isha_adhan": "6:37pm"
//     },
//     "donation_url": "https://www.masjidnow.com/masjids/10067-khadeeja-islamic-center/donations",
//     "push_messages_enabled": false,
//     "monthly_info": "",
//     "url": "/masjids/10067-khadeeja-islamic-center",
//     "cover_photo_url": null
//   }
// }
const run = async () => {
  const dd = await Promise.all([
    util.loadJson(
      "https://www.masjidnow.com/api/v2/salah_timings/daily.json?masjid_id=10067",
    ),
    util.loadJson(
      "https://www.masjidnow.com/api/v2/salah_timings/daily.json?masjid_id=10069",
    ),
  ]);

  dd.forEach(({ masjid: { salah_timing: t } }, i) => {
    if (t.date === util.strftime("%Y-%m-%d", ids[i])) {
      util.setIqamaTimes(ids[i], [t.fajr, t.dhuhr, t.asr, t.maghrib, t.isha]);
    } else {
      util.setIqamaTimes(ids[i], Array(5).fill("--"));
    }
    util.setJumaTimes(ids[i], ["check website"]);
  });

  return ids;
};

export const crawler: CrawlerModule = {
  name: "US/UT/islamic-society-of-greater-salt-lake",
  ids,
  run,
};
